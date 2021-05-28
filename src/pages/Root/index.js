import React from 'react';
import SideMenu from '../../components/SideMenu';
import InfoCard from './components/InfoCard/InfoCard'
import CalendarCard from './components/CalendarCard/CalendarCard'
import './RootScss.scss';
import { useDispatch, useSelector } from "react-redux";

export default function Root(props){
    const dispatch = useDispatch();
    const state = useSelector( state => state )
    return(
        <SideMenu
            {...props}
        >
            <div className='card_style'>
                <InfoCard />
                <CalendarCard/>
            </div>
        </SideMenu>
    )
}