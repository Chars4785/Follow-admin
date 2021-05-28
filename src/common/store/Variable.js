import { UserOutlined, ToolOutlined, SmileOutlined, ApartmentOutlined } from '@ant-design/icons';

export const MAIN_MENU ={
    management:{
        name:'관리자 모드',
        key:'management',
        icon: ToolOutlined,
        to:'/management',
        subMenu:[
            {
                name:'계정 관리',
                key:'account',
                to:'/management/account'
            },
            {
                name:'GBS 관리',
                key:'gbs_managemen',
                to:'/management/gbs_management'
            }
        ]
    },
    sheepManagement:{
        name:'인적관리',
        key:'sheep_management',
        icon: UserOutlined,
        to:'/sheep_management',
        subMenu:[
            {
                name:'출석체크 및 검색',
                key:'attend',
                to:'/sheep_management/attend'
            },
            // {
            //     name:'통계',
            //     key:'statistics',
            //     to:'/sheep_management/statistics'
            // }
        ]
    },
    nursing_management:{
        name:'양육관리',
        key:'nursing_management',
        icon:SmileOutlined,
        to:'/nursing_management',
        subMenu:[
            {
                name:'양육일기',
                key:'nursing_diary',
                to:'/nursing_management/nursing_diary'
            }
        ]
    },
    department_management:{
        name:'부서관리',
        key:'department_management',
        icon: ApartmentOutlined,
        to:'/department_management',
        subMenu:[
            {
                name:'Follow 일정',
                key:'follow_calendar',
                to:'/department_management/follow_calendar'
            },
            // {
            //     name:'사역팀 관리',
            //     key:'ministry_management',
            //     to:'/department_management/ministry_management'
            // },
            {
                name:'공지사항 관리',
                key:'notice_mangement',
                to:'/department_management/notice_mangement'
            }
        ]
    }
}

export const LOGO_URL = '@assets/images'