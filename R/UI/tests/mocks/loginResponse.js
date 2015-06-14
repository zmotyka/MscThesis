
module.exports = {
    request: {
        path: '/security/login',
        method: 'POST'
    },
    response: {
        data: {
            securityTokenSerialisedData: '<SecurityToken i:type=\"SignedSecurityToken\" xmlns=\"http://schemas.datacontract.org/2004/07/Greenlight.Sts.Common\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><_userId>780deb07-8277-4554-b377-4d5828941931</_userId><_issueDate>2015-05-27T08:53:07.2929771Z</_issueDate><_expiryDate>2015-05-27T09:23:07.2929771Z</_expiryDate><_renewExpiryDate>2015-08-31T08:53:07.2929771Z</_renewExpiryDate><_signature>WgIDbvycmnXfC+Lmy7i6gFSCjV+bvN6cbphCMGoxsxmBYN2uTKTn027C0BQXk+WW4Oh6ruIQ4HfqNU7bQ6apqfnKjHPWkCNXN463fS7IZQ6+KZmOxg2xkcDviy7yZ10N/f7E5RcQvx/Rz7ia/1fWhr3bwq8nA/0z+1IlrCt6pHk=</_signature></SecurityToken>',
            user: {
                id: '780deb07-8277-4554-b377-4d5828941931',
                username: 'zenonmotyka@greenlightdigital.com',
                isDeleted: false,
                isLockedOut: false,
                roles: [
                    {
                        id:'f1abde8e-af41-4fa5-a225-c63b13a52ea2',
                        name:'Program Administrator',
                        permissions:[
                            {
                                $id:'1',
                                id:'30621154-47ca-4531-bf36-2b46ac303401',
                                name:'manage users'
                            }, {
                                $id:'2',
                                id:'0fa2eab8-c9fa-49e3-99b9-4b5a4d33ae65',
                                name:'manage scraping stop/start'
                            }, {
                                $id:'3',
                                id:'236edff7-d1e2-4453-b9b7-57ff266094e4',
                                name:'manage scraping scheduling'
                            }, {
                                $id:'4',
                                id:'ce1a49a4-2a42-4ffb-a216-773f80c7d865',
                                name:'manage tasks'
                            }, {
                                $id:'5',
                                id:'a7c0672d-54c9-4603-bf45-eba7eef59fff',
                                name:'manage program reports'
                            }
                        ],
                        category:'Administrate',
                        description:'Allows to administrate programs.'
                    }, {
                        id:'30a9fffe-c32e-4f4a-b2e7-ec8f8a63d3d9',
                        name:'Hydra Administrator',
                        permissions:[
                            {
                                $id:'6',
                                id:'2218ad82-14e0-46f5-b28c-114a759ceda3',
                                name:'manage databases'
                            }, {
                                $ref:'1'
                            }, {
                                $id:'7',
                                id:'2d02e220-82d6-4a61-87bf-363eabbe1ec8',
                                name:'manage system users'
                            }, {
                                $ref:'2'
                            }, {
                                $id:'8',
                                id:'56ddc407-9a4e-4944-8d52-5776c29a8e54',
                                name:'optimise products'
                            }, {
                                $ref:'3'
                            }, {
                                $ref:'4'
                            }, {
                                $id:'9',
                                id:'03e82642-2856-404b-8cc9-7858f00b72fc',
                                name:'view cloud seo'
                            }, {
                                $id:'10',
                                id:'7e401aa0-774c-47e3-8edf-8323b9b99c2a',
                                name:'view logs'
                            }, {
                                $id:'11',
                                id:'c8adfa2a-6399-46fc-b16a-92243e39b239',
                                name:'manage cloud seo'
                            }, {
                                $id:'12',
                                id:'07c5a724-921b-454b-80aa-abd1910a5173',
                                name:'manage programs'
                            }, {
                                $id:'13',
                                id:'fe211ec5-c287-44ee-8c37-d7bddab1b48b',
                                name:'optimise pages'
                            }
                        ],
                        category:'Administrate',
                        description:'Allows to administrate whole system.'
                    }],
                awaitingFirstLogin:false,
                firstName:'Zenon',
                lastName:'Motyka'
            }
        },
        status:200
    }
};