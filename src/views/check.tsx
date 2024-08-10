import { IconAscend, IconCopyAdd, IconHelpCircle, IconHistory, IconMenu, IconMinimize, IconQuit, IconSync } from '@douyinfe/semi-icons'
import { Nav, Typography } from '@douyinfe/semi-ui'
import { useEffect, useState } from 'react'
import Bookmark from '~components/Bookmark'

function CheckView() {
  const { Title } = Typography
  const [data, setData] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])

  useEffect(() => {
    chrome.bookmarks.getTree()
      .then((date) => {
        setData(date)
      })
  }, [])

  return (
    <>
      <Nav
        defaultOpenKeys={['user', 'union']}
        bodyStyle={{ height: 1042 }}
        mode="vertical"
        className="self-stretch"
      >
        <Nav.Item
          itemKey="Home"
          text="Home"
          icon={<IconHelpCircle className="size-5" />}
        />
        <Nav.Item
          itemKey="Dashboard"
          text="Dashboard"
          icon={<IconAscend className="size-5" />}
        />
        <Nav.Item
          itemKey="Project"
          text="Project"
          icon={<IconCopyAdd className="size-5" />}
        />
        <Nav.Item
          itemKey="Tasks"
          text="Tasks"
          icon={<IconHistory className="size-5" />}
        />
        <Nav.Item
          itemKey="Reporting"
          text="Reporting"
          icon={<IconMinimize className="size-5" />}
        />
        <Nav.Item
          itemKey="Users"
          text="Users"
          icon={<IconMenu className="size-5" />}
        />
        <Nav.Item
          itemKey="Support"
          text="Support"
          icon={<IconQuit className="size-5" />}
        />
        <Nav.Item
          itemKey="Settings"
          text="Settings"
          icon={<IconSync className="size-5" />}
        />
      </Nav>
      <div className="flex w-full flex-col gap-y-6 pl-8 pt-8">
        <Title heading={5}>Reporting</Title>
        <div className="w-full">
          { data.length >= 1 && <Bookmark tree={data[0].children} />}
        </div>
      </div>
    </>
  )
}

export default CheckView
