// HeaderComponent.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const HeaderComponent = ({ currentUser, currentUserRole, handleLoginDialogOpen, handleRegisterDialogOpen, handleLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    学校出勤率
                </Typography>

                {/* Login, register, and logout buttons */}
                {currentUser ? (
                    <>
                        <Typography variant="subtitle1">
                            Logged in as {currentUser} ({currentUserRole})
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleLoginDialogOpen}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={handleRegisterDialogOpen}>
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent;