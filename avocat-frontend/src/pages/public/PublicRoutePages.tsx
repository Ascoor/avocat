import React from 'react';
import HomePage from '@features/home/pages/HomePage';
import PublicContentPage from '@features/home/pages/PublicContentPage';
import Login from '@features/auth/pages/Login';
import Signup from '@features/auth/pages/Signup';

export const HomeRoutePage = () => <HomePage />;

export const PublicContentRoutePage = ({ pageKey }) => (
  <PublicContentPage pageKey={pageKey} />
);

export const LoginRoutePage = () => <Login />;

export const SignupRoutePage = () => <Signup />;
