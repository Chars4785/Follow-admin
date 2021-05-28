import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Table,Tag, Space, Button, Input, Descriptions, Select } from 'antd'
import _ from 'lodash';
import './Account.scss';
import CreateAccountModal from '../../components/CreateAccountModal';
import { useDispatch, useSelector } from "react-redux";
import DataManager from '../../util/DataManager';
import moment from 'moment';

const { Search } = Input
const { Option } = Select;

const PAGE_LIMITE = 8
const DEFAULT_QUERY = 'name'

function Account({ history, actionStore }){
    const { messageHandler } = useSelector(state => state.commonStore);
    const [createAccountModalVisible,setcreateAccountModalVisible] = useState(false);
    const [peopleDetail, setPeopleDetail] = useState(undefined)
    const [count, setCount] = useState(0);
    const [page,setPage] = useState(1);
    const [users,setUsers] = useState([]);
    const [queryName, setQueryName] = useState(DEFAULT_QUERY);

    const columns = useMemo(()=> [
      {
        title: '이름',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
      },
      {
        title: 'ID',
        dataIndex: 'userId',
        align: 'center',
        key: 'leader',
      },
      {
        title: '생년월일',
        dataIndex: 'birthDay',
        align: 'center',
        key: 'rate',
        render: date =>{
          return moment(date).format('YYYY-MM-DD')
        }
      },
      {
        title: '등록일',
        dataIndex: 'registerDate',
        align: 'center',
        key: 'rate',
        render: date =>{
          return moment(date).format('YYYY-MM-DD')
        }
      },
      {
        title: '전화번호',
        dataIndex: 'phoneNumber',
        align: 'center',
        key: 'rate',
      },
      {
        title: '분류',
        key: 'tags',
        align: 'center',
        dataIndex: 'tags',
        render: tags => {
          if( _.isEmpty(tags) ) return;
        return _.map( tags,( value,key )=>{
            if( key === 'discipleship' ) return <Tag key={`${key}`} color='red'>리더</Tag>
            if( key === 'discipleshipA' ) return <Tag key={`${key}`} color='blue'>제자학교A</Tag>
            if( key === 'discipleshipB' ) return <Tag key={`${key}`} color='green'>제자학교B</Tag>
          })
        },
      },
      {
        title: '편집',
        key: 'operation',
        render: (value) => (
          <Space size="middle">
            <Button onClick={() => onChangeDetailButton(value)}>편집</Button>
          </Space>
        )
      },
    ],[ peopleDetail ]);

    const onChangeDetailButton = useCallback(( value ) => {
      setPeopleDetail(value)
      setcreateAccountModalVisible(true);
    },[ peopleDetail ])

    const onClickCreateAccount = (value) =>{
      setcreateAccountModalVisible(value);
      setPeopleDetail(undefined);
    }

    const onChangePagination = (page) =>{
      setPage(page)
      fetchUserList({page, limit:PAGE_LIMITE})
    }

    const fetchUserList = useCallback( async ( query ) =>{
      const data = await DataManager.getUsersList( query )
      const { documentsCount, users } = data
      const userTable = _.map( users ,(user,index)=>{
        return {
          key:index,
          name:user.name,
          userId:user.userId,
          birthDay:user.birthDay,
          registerDate:user.registerDate,
          phoneNumber:user.phoneNumber,
          tags:user.isDisciple
        }
      })
        setUsers(userTable);
        setCount(documentsCount)
    },[])

    const onSearch = (value)  => {
      const query = { queryName, value }
      fetchUserList({ queryName, value, page:1, limit:PAGE_LIMITE });
    }

    const onChangeSelect = (value) =>{
      setQueryName(value)
    }

    const renderSelectOption = () =>{
      return _.map(columns,( column ) =>{
        if( column.title === '분류' || column.title === '편집' ) return
        return( <Option value={column.dataIndex}>
                  {column.title}
                </Option> )
      })
      
    }
    
    return(
      <div className='account_body'>
        <div className='search_wrapper'>
          <Descriptions size="small" bordered>
            <Descriptions.Item label="추가" span={3}>
                <Button onClick={() => onClickCreateAccount(true)}>
                    추가 하기
                </Button>
            </Descriptions.Item>
            <Descriptions.Item label="검색 조건" span={3}>
              <Select 
                    defaultValue={DEFAULT_QUERY}
                    size="middle"
                    style={{ width:'100%' }}
                    onChange={onChangeSelect}
                >
                  {renderSelectOption()}
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="검색" span={3}>
              <Search
                  placeholder="스페이스로 구분해서 넣어주세요"
                  allowClear
                  enterButton="검색"
                  size="large"
                  onSearch={onSearch}
                />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className='search_wrapper'>
          <Table 
            columns={columns} 
            dataSource={users}
            pagination={
              {
                  size: 'small',
                  onChange: onChangePagination,
                  total: count,
                  current: page,
                  pageSize: PAGE_LIMITE,
            } }
          />
        </div>
        {createAccountModalVisible &&
          <CreateAccountModal
              user={peopleDetail}
              actionStore={actionStore}
              isVisible={createAccountModalVisible}
              onClickCreateAccount={onClickCreateAccount}
          />}
      </div>
    )
}

export default Account;