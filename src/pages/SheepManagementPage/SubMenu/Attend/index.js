import React, { useState, useCallback, useMemo } from 'react';
import SideMenu from '../../../../components/SideMenu';
import { MAIN_MENU, LOGO_URL } from '../../../../common/store/Variable';
import { Table,Tag, Space, Button, Input, Descriptions } from 'antd'
import _ from 'lodash';
import './Attend.scss';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import PeopleDetailModal from '../../components/PeopleDetailModal'
  
  const data = [
    {
      key: '1',
      name: '이종민',
      leader: '이종민',
      codi: '정다솔',
      rate:`${22.3}%`,
      tags: ['리더'],
    },
    {
      key: '2',
      name: '강민수',
      leader: '강민수',
      codi: '강민아',
      rate:`${22.3}%`,
      tags: ['리더'],
    },
    {
      key: '3',
      name: '권용수',
      leader: '권용수',
      codi: '정훈',
      rate:`${22.3}%`,
      tags: ['리더'],
    },
  ];

  const tagsData = ['전체', '리더', '코디', '조원','간사'];

function Attend( props ){
    const { pathname } = props.location;
    const [selectedTags,setSelectedTags] = useState(tagsData[0]);
    const [peopleDetail, setPeopleDetail] = useState(undefined)

    const columns = useMemo(()=> [
      {
        title: '이름',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
      },
      {
        title: '리더',
        dataIndex: 'leader',
        align: 'center',
        key: 'leader',
      },
      {
        title: '코디',
        dataIndex: 'codi',
        align: 'center',
        key: 'codi',
      },
      {
        title: '출석율',
        dataIndex: 'rate',
        align: 'center',
        key: 'rate',
      },
      {
        title: '분류',
        key: 'tags',
        align: 'center',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '정보',
        key: 'action',
        render: (value) => (
          <Space size="middle">
            <Button onClick={() => onChangeDetailButton(value)}>보기</Button>
          </Space>
        ),
      },
    ],[ peopleDetail ]);

    const onChangeDetailButton = useCallback(( value ) => {
      setPeopleDetail(value)
    },[ peopleDetail ])

    const handleChange = (tag, checked) => {
      setSelectedTags(tag)
    }
    
    return(
        <div className='attend_body'>
          <div className='search_wrapper'>
            <Descriptions size="small" bordered>
            <Descriptions.Item label="분류" span={3}>
            {tagsData.map(tag => (
              <CheckableTag
                key={tag}
                // checked={tagsData.filter(tagsData,(i)=> i === selectedTags)}
                onChange={checked => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
              </Descriptions.Item>
              <Descriptions.Item label="검색" span={3}>
                <Input placeholder="검색"/>
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className='search_wrapper serach_table'>
            <Table 
              columns={columns} 
              dataSource={data}
            />
          </div>
          { peopleDetail &&
            <PeopleDetailModal 
              peopleDetail={peopleDetail}
              onChangeDetailButton={onChangeDetailButton}
            />
          }
        </div>
    )
}

export default Attend;