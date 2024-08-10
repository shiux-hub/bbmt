import { Nav } from '@douyinfe/semi-ui'
import { IconCheckbox, IconIntro, IconToast } from '@douyinfe/semi-icons-lab'
import { IconSemiLogo } from '@douyinfe/semi-icons'
import { Outlet, useNavigate } from 'react-router-dom'

function Component() {
  const navigator = useNavigate()
  return (
    <Nav
      isCollapsed
      bodyStyle={{ height: 978 }}
      mode="vertical"
      header={{
        logo: (
          <IconSemiLogo className="text-semi-color-text-0" style={{ fontSize: '36px' }} />
        )
      }}
      footer={{
        collapseButton: true
      }}
      className="self-stretch"
    >
      <Nav.Item
        itemKey="home"
        text="Home"
        icon={<IconIntro className="size-5" />}
      />
      <Nav.Item
        itemKey="check"
        text="Check"
        icon={<IconCheckbox className="size-5" />}
        onClick={() => navigator('/check')}
      />
      <Nav.Item
        itemKey="tabs"
        text="Tabs"
        icon={<IconToast className="size-5" />}
        onClick={() => navigator('/tabs')}
      />
    </Nav>

  )
}

export default Component
