import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Table, Descriptions, Form, Select, Input, TreeSelect, Button, message} from 'antd'
import GBS_EditorModal from '../GBS_EditorModal';
import './GBS_Card.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
                남은 조원
            </h2>
        )
    }


    const renderSelect = ( mode ="multiple") =>{
        return(
            <Select 
                mode={mode}
                showSearch
                size="middle"
                style={{ width:'100%' }}
            >
                <Option value="이종민1">이종민1</Option>
                <Option value="이종민2">이종민2</Option>
                <Option value="이종민3">이종민3</Option>
                <Option value="이종민4">이종민4</Option>
            </Select>
        )
    }
    
    return(
        <div className='search_wrapper'>
                <Descriptions 
                    title={
                        <div>
                            <span>
                                2020.09.01~2021.03.01
                            </span>    
                            <span>
                                <Button 
                                    type="primary"
                                    onClick={() =>onClickEditor(true)}
                                >
                                    편집
                                </Button>
                            </span>
                            <span>
                                <Button type="primary" danger>
                                    적용중
                                </Button>
                            </span>
                            <span>
                                <Button type="default"
                                    onClick={onClickOpenGBSTable}>
                                    펼치기
                                </Button>
                            </span>
                        </div>
                    }
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
                        title={()=>renderTableTitle()}
                        columns={columns}
                        dataSource={data}
                    />
                    <Descriptions
                        bordered
                    >
                        <Descriptions.Item label="양육 간사">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사2">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사3">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사4">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사6">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사7">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사8">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="양육 간사9">
                            {renderSelect("default")}
                        </Descriptions.Item>
                        <Descriptions.Item label="" />
                    </Descriptions>
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.List name="names">
                            {(fields, { add, remove }, ) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    >
                                        <Descriptions
                                            bordered
                                        >
                                            <Descriptions.Item label="코디">
                                                {renderSelect("default")}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="조원">
                                                {renderSelect()}
                                            </Descriptions.Item>
                                            <Descriptions.Item>
                                                <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        코디 추가
                                    </Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                저장
                            </Button>
                        </Form.Item>
                    </Form>
                </div>}
                {gbs_editorModalVisible &&
                    <GBS_EditorModal
                        isVisible={gbs_editorModalVisible}
                        onClickEditor={onClickEditor}
                />}
            </div>
            
    )
}

export default GBS_EditorMdoal;