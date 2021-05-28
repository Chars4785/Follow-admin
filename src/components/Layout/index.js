import React, { Component } from 'react';
import SideMenu from '../SideMenu';
import HeaderBar from '../HeaderBar';
import './LayoutScss.scss'

class Layout extends Component{
    constructor( props ) {
        super( props );

    }
    
    renderHeader = ()=>{
        

    }

    renderRightSider = () =>{
        const { data } = this.props;
        return(
            <SideMenu 
                menuName={data}
            />
        )
    }

    renderLeftSider = () =>{
        if( this.props.sideMenuPosition !== 'left' ) return;
        
    }

    render() {
        return (
            <div className="app_body">
                { this.renderRightSider() }
            </div>
        )
    }
}

export default Layout
