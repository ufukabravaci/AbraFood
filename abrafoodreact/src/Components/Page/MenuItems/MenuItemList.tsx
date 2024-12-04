import React from 'react'
import { useState,useEffect } from 'react';
import menuItemModel from '../../../Interfaces/menuItemModel';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';


function MenuItemList() {
    // const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

    const {data, isLoading} = useGetMenuItemsQuery(null);
    const dispatch = useDispatch();

    useEffect(() => {
      if(!isLoading){
        dispatch(setMenuItem(data.result))
      }
    },[isLoading])
    if(isLoading){
      return <MainLoader/>
    }
  return (
    <div className='container row'>
      {data.result.length>0 && data.result.map((menuItem: menuItemModel, index: number) => (
        <MenuItemCard menuItem = {menuItem} key={index}/>
      ))
      }
    </div>
  )
}

export default MenuItemList