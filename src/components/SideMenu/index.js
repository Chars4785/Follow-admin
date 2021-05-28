import React from 'react';
import { Menu,Layout, Button } from 'antd'
import _ from 'lodash'
import './SideMenuScss.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MAIN_MENU, LOGO_URL } from '../../common/store/Variable';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class SideMenu extends React.Component{
    constructor( props ){
        super(props)
        this.state ={
            openKey: []
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if( this.props.user !== prevProps.user ){
            this.props.history.push('/');
        }
    }

    componentDidMount(){
        console.log("didMount")
    }

    componentWillUnmount(){
        console.log("didUnMOunt",this.props)
    }

    onOpenChange = (openKeyValue) =>{
        const { openKey, changeOpenkey } = this.props;
        const newOpenKey =_.difference(openKeyValue, openKey);
        changeOpenkey(newOpenKey);
    };

    onPressSignOut = () =>{
        this.props.signOut();
        this.props.history.push('/');
    }

    renderSubMenu = (subNavs) =>{
        return _.map( subNavs, (nav, index) =>(
            <Menu.Item
                key={nav.key}
                style={{marginLeft:'5px'}}
            >
                <Link
                    to={nav.to}
                    key={nav.key}
                >
                    <span>{nav.name}</span>
                </Link>
            </Menu.Item>
        ))
    }

    renderSide = () => {
        return _.map( MAIN_MENU, ( navs, index ) =>{
        if( _.isEmpty(navs.subMenu) ){
            return(
                <Menu.Item
                    key={navs.key}
                    icon={React.createElement(navs.icon)}
                >
                    <Link
                        to={navs.to}
                        key={navs.key}
                    >
                        <span>{navs.name}</span>
                    </Link>
                </Menu.Item>
            )
        }
        return( <SubMenu 
                    key={navs.key}
                    title={navs.name}
                    icon={React.createElement(navs.icon)}
                >
                    {this.renderSubMenu(navs.subMenu)}
                </SubMenu>)
        })
    }

    render(){
        const { currentMenu, history, openKey } = this.props;
        const selctedKeys = history.location.pathname.split('/');
        const selectMenuKey = _.last(selctedKeys);
        return(
            // <div className="app_body">
                <Layout className="app_body">
                    <Sider className="site-layout-background">
                        <div className="sider_logo_wrapper">
                            <Link to="/main">
                                <img src={require('../../assets/images/follow/follow.png')}/>
                            </Link>
                        </div>
                        <Button 
                            onClick={()=>this.onPressSignOut()}
                        >
                            로그아웃
                        </Button>                            
                        <div className="sider-left-memus">
                            <Menu
                                mode="inline"
                                selectedKeys={[selectMenuKey]}
                                openKeys={openKey}
                                onOpenChange={this.onOpenChange}
                            >
                                {this.renderSide()}
                            </Menu>
                        </div>
                    </Sider>
                    <div className="sider_children">
                        <Content>
                            {this.props.children}
                        </Content>
                    </div>
                </Layout>
            // </div>
        )
    }
}
// export default SideMenu;
// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
    openKey:state.commonStore.openKey,
    user:state.userStore.user
})
  
  // props 로 넣어줄 액션 생성함수
const mapDispatchToProps = (dispatch,ownProps) => {
    const {
        commonAction,
        userAction
    } = ownProps && ownProps.actionStore
    return {
        changeOpenkey: (openkey) => dispatch(commonAction.changeOpenkey(openkey)),
        signOut: () => dispatch(userAction.signOutAction()),
    }
};
  
// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu);

