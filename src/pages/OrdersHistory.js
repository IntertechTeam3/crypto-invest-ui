import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, PageHeader } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import "./OrdersHistory.css";

const data = [
    {
        key: '1',
        send: 'Send',
        kidName: 'Yılmaz',
        address: '7re6fd567fd676df',
        amount: 0.4,
    },
    {
        key: '2',
        send: 'Withdraw',
        kidName: 'İlkkan',
        address: '68df6df6df678df87dsf67',
        amount: 0.1,
    },
    {
        key: '3',
        send: 'Send',
        kidName: 'Kurt',
        address: 'f67dtd67f6fdf6d78df',
        amount: 0.3,
    },
];

const UsersSearch = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });

    const columns = [


        {
            title: 'Send',
            dataIndex: 'send',
            key: 'send',
            width: '20%',
            ...getColumnSearchProps('send'),
            sorter: (a, b) => a.send.length - b.send.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Child Name',
            dataIndex: 'kidName',
            key: 'kidName',
            width: '20%',
            ...getColumnSearchProps('kidName'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '20%',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '20%',
            ...getColumnSearchProps('amount'),
            sorter: (a, b) => a.amount - b.amount,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    return (
        <div>
            <div className="ok" >

                <img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"  ></img>

                <h1 >
                    ORDERS
                </h1>
            </div>

            <Table columns={columns} dataSource={data} />
        </div>


    );
};


export default UsersSearch;

