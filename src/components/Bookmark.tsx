import { IconClock, IconClose, IconFolder, IconLink, IconLoading } from '@douyinfe/semi-icons'
import { IconCheckbox } from '@douyinfe/semi-icons-lab'
import { Badge, Breadcrumb, Button, Tree, Typography } from '@douyinfe/semi-ui'
import type { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree'
import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'
import axios from 'axios'
import { useState } from 'react'
import { RequestStatus } from '~utils/enums'
import instance from '~utils/request'

function Bookmark({ tree }: {
  tree?: chrome.bookmarks.BookmarkTreeNode[]
}) {
  function getTreeData(children: chrome.bookmarks.BookmarkTreeNode[], breadcrumbs?: string[]): TreeNodeData[] {
    const title = breadcrumbs || []
    return children.map((node) => {
      if (node.children) {
        if (node.children.length <= 1) {
          return {
            label: <Item node={node} />,
            value: node.id,
            key: node.id
          }
        }
        return {
          label: (
            <div className="flex items-center gap-2">
              <IconFolder className="text-xl" />
              {title.length > 0
                ? (
                    <Breadcrumb>
                      {title.map(breadcrumb => (
                        <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
                      ))}
                    </Breadcrumb>
                  )
                : node.title}
            </div>
          ),
          value: node.id,
          key: node.id,
          children: node.children.length <= 1 ? getTreeData(node.children, [...breadcrumbs, node.title]) : getTreeData(node.children)
        }
      }
      return {
        label: <Item node={node} />,
        value: node.id,
        key: node.id
      }
    })
  }

  return (
    <Tree
      treeData={getTreeData(tree)}
      multiple
    />
  )
}

function States({ type }: {
  type: RequestStatus
}) {
  switch (type) {
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
  node: chrome.bookmarks.BookmarkTreeNode
}) {
  const [states, setStates] = useState(RequestStatus.Pending)
  let source: CancelTokenSource
  const { Text } = Typography

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => {
          if (states === RequestStatus.Loading)
            return source.cancel()

          setStates(RequestStatus.Loading)
          const closeToken = axios.CancelToken
          source = closeToken.source()

          const config: AxiosRequestConfig = {
            timeout: 5000,
            cancelToken: source.token
          }

          instance.get(node.url, config)
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
        }}
        icon={<States type={states} />}
        loading={states === RequestStatus.Loading}
      />
      <div>{node.title}</div>
      <Text link={{ href: node.url, target: '_blank' }} className="font-mono" icon={<IconLink />} underline>{node.url}</Text>
      {node.dateAdded
      && <Badge count={node.dateAdded} />}
    </div>
  )
}

export default Bookmark
