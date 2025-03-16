import type { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree'
import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'
import { IconClock, IconClose, IconLink, IconLoading } from '@douyinfe/semi-icons'
import { IconCheckbox } from '@douyinfe/semi-icons-lab'
import { Badge, Button, Tree, Typography } from '@douyinfe/semi-ui'
import axios from 'axios'
import { isArray } from 'radash'
import { useRef, useState } from 'react'
import { RequestStatus } from '~utils/enums'
import instance from '~utils/request'

function Bookmark({ tree }: {
  tree?: chrome.bookmarks.BookmarkTreeNode[]
}) {
  // const [checkedValues, setCheckedValues] = useState<string[]>()
  // const [startCheck, setStartCheck] = useState(false)

  function getTreeData(children: chrome.bookmarks.BookmarkTreeNode[]) {
    return children.map((node) => {
      if (isArray(node.children)) {
        return {
          label: node.title,
          key: node.id,
          children: getTreeData(node.children),
        }
      }
      return {
        label: node.title,
        value: node.url,
        key: node.id,
      }
    })
  }

  // function getChildren(children: TreeNodeData[]) {
  //   let result: string[] = []

  //   children.forEach((node) => {
  //     if (isArray(node.children)) {
  //       result = result.concat(getChildren(node.children))
  //     }
  //     else {
  //       result.push(node.value as string)
  //     }
  //   })
  //   return result
  // }

  return (
    <Tree
      treeData={getTreeData(tree)}
      multiple
      directory
      filterTreeNode
      // onChangeWithObject
      // onChange={(value: TreeNodeData[]) => {
      // console.log(value)

      // setCheckedValues(getChildren(value))
      // }}
      renderLabel={(_, node) => {
        if (isArray(node.children)) {
          return (
            <div className="flex items-center gap-2">
              {node.label}
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  // setStartCheck(true)
                }}
              >
                开始测试
              </Button>
              <Badge count={node.children.length} />
            </div>
          )
        }
        return <Item node={node} />
      }}
    />
  )
}

function Status({ type }: {
  type: RequestStatus
}) {
  switch (type) {
    case RequestStatus.Loading:
      return <IconLoading className="animate-spin" />
    case RequestStatus.Succuss:
      return <IconCheckbox className="text-semi-color-success" />
    case RequestStatus.Error:
      return <IconClose className="text-semi-color-danger" />
    case RequestStatus.Timeout:
      return <IconClock className="text-semi-color-warning" />
    default:
      return <div className="size-4 rounded-full border-2 border-semi-color-primary" />
  }
}

function useStatus(node: TreeNodeData) {
  const source = useRef<CancelTokenSource>()
  const [status, setStatus] = useState(RequestStatus.Pending)

  const config: AxiosRequestConfig = {
    timeout: 5000,
    cancelToken: source.current.token,
  }

  function testUrl() {
    if (status === RequestStatus.Loading)
      return source.current.cancel()
    setStatus(RequestStatus.Loading)
    const closeToken = axios.CancelToken
    source.current = closeToken.source()
    instance.get(node.value as string, config)
      .then(() => {
        setStatus(RequestStatus.Succuss)
      })
      .catch((error: AxiosError) => {
        if (error.code === 'ECONNABORTED')
          setStatus(RequestStatus.Timeout)
        else if (axios.isCancel(error))
          setStatus(RequestStatus.Pending)
        else
          setStatus(RequestStatus.Error)
        console.error(error)
      })
  }
  return { status, testUrl }
}

function Item({ node }: {
  node: TreeNodeData
  // requestStart: boolean
  // checked: boolean
}) {
  const { Text } = Typography
  const { status, testUrl } = useStatus(node)

  // if (requestStart && checked) {
  //   testURL()
  // }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          testUrl()
        }}
        icon={<Status type={status} />}
      />
      <div>{node.label}</div>
      <Text link={{ href: node.value as string, target: '_blank' }} className="font-mono" icon={<IconLink />} underline>{node.value}</Text>
    </div>
  )
}

export default Bookmark
