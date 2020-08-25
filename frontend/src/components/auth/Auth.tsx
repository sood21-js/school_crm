import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Auth(){
    return (
        <div className="auth__body">
            <div className="auth__form">
                <div className="auth__title">
                    <div>
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div>
                        school crm
                    </div>
                </div>
                <div className="auth__input">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email или Логин"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>
                <div className="auth__input">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        name="password"
                        autoComplete="password"
                        autoFocus
                    />
                </div>
                <div className="auth__input">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Войти
                    </Button>
                </div>
                
            </div>
        </div>
    );
}