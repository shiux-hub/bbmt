import { IconFolder } from '@douyinfe/semi-icons'
import { Nav, Typography } from '@douyinfe/semi-ui'
import { isArray } from 'radash'
import { useEffect, useState } from 'react'
import Bookmark from '~components/Bookmark'

function CheckView() {
  const { Title } = Typography
  const [rootData, setRootData] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])
  // const [currentData, setCurrentData] = useState<chrome.bookmarks.BookmarkTreeNode>()

  useEffect(() => {
    chrome.bookmarks.getTree()
      .then((date) => {
        setRootData(date)
      })
  }, [])

  function getNavItemsData(children: chrome.bookmarks.BookmarkTreeNode[]) {
    const icon = <IconFolder />
    return children.map((node) => {
      if (isArray(node.children)) {
        return {
          text: node.title,
          itemKey: node.id,
          icon,
          items: getNavItemsData(node.children),
        }
      }
      return {
        text: node.title,
        icon,
        itemKey: node.id,
      }
    })
  }

  return (
    <>
      <Nav
        defaultOpenKeys={['user', 'union']}
        bodyStyle={{ height: 1042 }}
        mode="vertical"
        className="self-stretch"
        items={getNavItemsData(rootData)}
      />
      <div className="flex w-full flex-col gap-y-6 pl-8 pt-8">
        <Title heading={5}>Reporting</Title>
        <div className="w-full">
          { rootData.length >= 1 && <Bookmark tree={rootData[0].children} />}
        </div>
      </div>
    </>
  )
}

export default CheckView
