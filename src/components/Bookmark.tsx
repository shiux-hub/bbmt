import { IconClock, IconClose, IconLink, IconLoading } from '@douyinfe/semi-icons'
import { IconCheckbox } from '@douyinfe/semi-icons-lab'
import { Badge, Button, Tree, Typography } from '@douyinfe/semi-ui'
import type { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree'
import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'
import axios from 'axios'
import { useRef, useState } from 'react'
import { isArray } from 'radash'
import { RequestStatus } from '~utils/enums'
import instance from '~utils/request'

function Bookmark({ tree }: {
  tree?: chrome.bookmarks.BookmarkTreeNode[]
}) {
  // const [checkedValues, setCheckedValues] = useState<string[]>()
  // const [startCheck, setStartCheck] = useState(false)

  function getTreeData(children: chrome.bookmarks.BookmarkTreeNode[]) {
    return children.map((node) => {
      if (Array.isArray(node.children)) {
        return {
          label: node.title,
          key: node.id,
          children: getTreeData(node.children)
        }
      }
      return {
        label: node.title,
        value: node.url,
        key: node.id
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

function States({ type }: {
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

function Item({ node }: {
  node: TreeNodeData
  // requestStart: boolean
  // checked: boolean
}) {
  const [states, setStates] = useState(RequestStatus.Pending)
  const source = useRef<CancelTokenSource>()
  const { Text } = Typography

  function testURL() {
    if (states === RequestStatus.Loading)
      return source.current.cancel()

    setStates(RequestStatus.Loading)
    const closeToken = axios.CancelToken
    source.current = closeToken.source()

    const config: AxiosRequestConfig = {
      timeout: 5000,
      cancelToken: source.current.token
    }

    instance.get(node.value as string, config)
      .then(() => {
        setStates(RequestStatus.Succuss)
      })
      .catch((error: AxiosError) => {
        if (error.code === 'ECONNABORTED')
          setStates(RequestStatus.Timeout)
        else if (axios.isCancel(error))
          setStates(RequestStatus.Pending)
        else
          setStates(RequestStatus.Error)
        console.error(error)
      })
  }

  // if (requestStart && checked) {
  //   testURL()
  // }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          testURL()
        }}
        icon={<States type={states} />}
      />
      <div>{node.label}</div>
      <Text link={{ href: node.value as string, target: '_blank' }} className="font-mono" icon={<IconLink />} underline>{node.value}</Text>
    </div>
  )
}

export default Bookmark
