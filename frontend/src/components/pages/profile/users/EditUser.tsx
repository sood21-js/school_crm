import React from 'react';

import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import { Flex } from '#src/libs/components/Flex';
import { TMode } from './Users';

import TextField from '@material-ui/core/TextField';
import { Text } from '#src/libs/components/Text';

type TEditUser = {
    changeMode: (mode: TMode) => void
}

export const EditUser: React.FC<TEditUser> = ({changeMode}: TEditUser) =>{
    
    const saveHandler = () => {}

    return (
        <>
            <Module>
                <div>
                    <h3>Создать нового пользователя</h3>
                </div>
                <hr />
                
                <Flex justifyContent='start' flexDirection='column'>
                    <Flex flexDirection='column' marginBottom='2rem'>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Фамилия
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Имя
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Отчество
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                    </Flex>
                    <Flex flexDirection='column' margin='1rem'>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Фамилия
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Имя
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                        <div className='user__block'>
                            <Text textAlign='right' marginRight='1rem'>
                                Отчество
                            </Text>
                            <TextField
                                id="outlined-basic" 
                                variant="outlined" 
                                size="small" 
                                required 
                            />
                        </div>
                    </Flex>
                </Flex>

                <Flex
                    justifyContent='flex-end'
                >

                    <div className='users__btn'>
                        <Button
                            onClick={() => saveHandler}
                            variant='outlined'
                            size='small'
                        >
                            Сохранить
                        </Button>
                    </div>

                    <div className='users__btn'>
                        <Button
                            onClick={() => changeMode('users_list')}
                            variant='outlined'
                            size='small'
                        >
                            Отмена
                        </Button>
                    </div>

                </Flex>
                
            </Module>
        </>
        
    )
}