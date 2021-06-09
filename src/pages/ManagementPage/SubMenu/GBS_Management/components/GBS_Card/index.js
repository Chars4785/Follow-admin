import React,{ useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { Table, Descriptions, Form, Select, Input, TreeSelect, Button, message} from 'antd'
import GBS_EditorModal from '../GBS_EditorModal';
import './GBS_Card.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dispatch from '../../../../../../common/utils/dispatch'
import { STATUS } from '../../../../../../common/store/Variable'

const { Group } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const columns = [
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '나이',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: '학년',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: '전리더',
      dataIndex: 'english',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

function GBS_EditorMdoal({
}){
    const [gbs_editorModalVisible,setGBSeditorModalVisible] = useState(false);
    const [openGBSTable, setOpenGBSTable] = useState(false);
    const [codi,setCodi] = useState({});
    const [member,setmember] = useState({});
    const [gansa,setgansa] = useState({});
    const [count,setCount] = useState(0);

    const onClickEditor = (value) =>{
        setGBSeditorModalVisible(value);
    }
    const onClickOpenGBSTable = useCallback(() =>{
        setOpenGBSTable(!openGBSTable)
    },[openGBSTable])

    const onFinish = (value) =>{

    }

    const renderTableTitle = () =>{
        return(
            <h2 className="tableTitle">
                조원 리스트
            </h2>
        )
    }

    const checkValue = ()  =>{
        console.log(member)
        console.log(gansa)
        console.log(codi)
    }

    const onPressSaveButton = () =>{
        const addMember = {
            key: String(count),
            name: '',
            status: '',
            gbs_member: []
        }
        member[String(count)] = addMember
        setmember(member)
        setCount(count + 1);
    }

    const onChangeMemberSelect = (value,key) =>{
        member[key] ={
            ...member[key],
            gbs_member: value
        }
        setmember(member)
    }

    const onChangeCodiSelect = (value,data) =>{
        const { key } = data
        member[key] = {
            ...member[key],
            name: value
        }
        setmember(member)
    }

    const onChangeGansaSelect = (value,key) =>{
        gansa[key] = value
        setgansa(gansa)
    }

    const renderSelectGansa = (key) =>{
        return(
            <Select
                mode={"default"}
                showSearch
                size="middle"
                style={{ width:'100%' }}
                onChange={(value) =>onChangeGansaSelect(value,key)}
            >
                <Option value="이종민1">이종민1</Option>
                <Option value="이종민2">이종민2</Option>
                <Option value="이종민3">이종민3</Option>
                <Option value="이종민4">이종민4</Option>
            </Select>
        )
    }

    const renderDescriptionTitle = () =>{
        return (
            <div className={'titleWrapper'}>
                <span>
                    2020.09.01~2021.03.01
                    <Button 
                        className={'saveButton'}
                        type="primary"
                        onClick={() =>onClickEditor(true)}
                    >
                        날짜 변경
                    </Button>
                    <Button 
                        className={'saveButton'}
                        type="primary"
                        onClick={() =>onClickEditor(true)}
                    >
                        저장
                    </Button>
                    <Button 
                        className={'saveButton'}
                        type="primary"
                        danger
                    >
                        적용중
                    </Button>
                </span>    
                    <Button 
                        className={'saveButton'}    
                        type="default"
                        onClick={onClickOpenGBSTable}
                    >
                        펼치기
                    </Button>
            </div>
        )
    }

    const onPressDelete = () =>{

    }

    const rendermember = (data) =>{
        const { key } = data
        return(
            <Form.Item>
                <Descriptions bordered>
                    <Descriptions.Item label="리더">
                        <Select
                            mode={'multiple'}
                            showSearch
                            size="middle"
                            style={{ width:'100%' }}
                            onChange={(v) => onChangeMemberSelect(v,key)}
                        >
                            <Option value="이종민1">이종민1</Option>
                            <Option value="이종민2">이종민2</Option>
                            <Option value="이종민3">이종민3</Option>
                            <Option value="이종민4">이종민4</Option>
                        </Select>
                    </Descriptions.Item>
                </Descriptions>
            </Form.Item>
        )
    }

    const renderCodi = () =>{
        return(_.map(member, (data,index) =>{
            return (
                <Form.Item key={`${index}`}>
                    <Descriptions bordered>
                        <Descriptions.Item label="코디">
                            <Select 
                                showSearch
                                size="middle"
                                style={{ width:'100%' }}
                                onChange={(value) => onChangeCodiSelect(value,data)}
                            >
                                <Option value="이종민1">이종민1</Option>
                                <Option value="이종민2">이종민2</Option>
                                <Option value="이종민3">이종민3</Option>
                                <Option value="이종민4">이종민4</Option>
                            </Select>
                            {rendermember(data)}
                            <Button
                                type={'dashed'}
                                onClick={onPressDelete(data)}
                            />      
                        </Descriptions.Item>
                    </Descriptions>
                </Form.Item>
            )
        }))
    }

    useEffect(() => {
        return () => {
        }
    }, [])
    
    return(
        <div className='search_wrapper'>
                <Descriptions 
                    title={renderDescriptionTitle()}
                    size="small"
                    bordered
                >
                    <Descriptions.Item label="인원">
                        <div>
                            간사 8명 코디 9명 리더 30
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="리더 출석율">
                        90%
                    </Descriptions.Item>
                    <Descriptions.Item label="조원 출석율">
                        50%
                    </Descriptions.Item>
                </Descriptions>
                {openGBSTable &&
                    <div>
                        <Table 
                            title={() =>renderTableTitle()}
                            columns={columns}
                            dataSource={data}
                        />
                        <Descriptions bordered>
                            <Descriptions.Item label="교육/훈련 간사">
                                {renderSelectGansa(STATUS.EDU_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="라인업/새가족간사 간사2">
                                {renderSelectGansa(STATUS.NEWFAMILY_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="예배/선교간사 간사3">
                                {renderSelectGansa(STATUS.WORSHIP_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="양육/재정간사 간사4">
                                {renderSelectGansa(STATUS.NURTURE_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="행정 간사6">
                                {renderSelectGansa(STATUS.ADMIN_GANSA)}
                            </Descriptions.Item>
                        </Descriptions>
                        <Form onFinish={onFinish}>
                            {renderCodi()}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={onPressSaveButton}>
                                    추가
                                </Button>
                                <Button type="primary" htmlType="submit" onClick={checkValue}>
                                    추가
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>}
                <GBS_EditorModal
                    isVisible={gbs_editorModalVisible}
                    onClickEditor={onClickEditor}
                />
            </div>
            
    )
}

export default GBS_EditorMdoal;