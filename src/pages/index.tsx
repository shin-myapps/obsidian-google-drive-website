import Head from 'next/head';
import { globalRefreshToken } from '@/helpers/state';
import React, { useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Persistence } from '@hookstate/persistence';
import { useHookstate } from '@hookstate/core';
import { Input, success } from '@richardx/components';
import Link from 'next/link';

const Home: React.FC<{}> = () => {
  const refreshToken = useHookstate(globalRefreshToken);

  const copy = () => {
    navigator.clipboard.writeText(refreshToken.value);
    success('Refresh token copied to clipboard!');
  };

  useEffect(() => {
    globalRefreshToken.attach(Persistence('refreshToken'));
  }, []);

  return (
    <>
      <Head>
        <title>Obsidian Google Drive</title>
      </Head>
      {refreshToken.value && (
        <div className='hero bg-red-300/30 dark:bg-red-900/30 py-12 px-8'>
          <div className='hero-content flex-col'>
            <div className='text-3xl text-center mb-4'>Your Refresh Token</div>
            <p className='mb-4 text-center'>
              Copy the following code into your Obsidian plugin setting
            </p>
            <Input
              onChange={() => {}}
              value={refreshToken.value}
              iconRight={<FaCopy onClick={copy} />}
              iconRightClickable
            />
          </div>
        </div>
      )}
      <div className='hero bg-gray-200/30 dark:bg-gray-900 py-24 px-8 text-center'>
        <div className='hero-content flex-col'>
          <h2 className='text-4xl font-bold'>Obsidian Google Drive</h2>
          <p className='md:w-[600px]'>
            Daily journal is an app that lets you log your day-to-day life in a
            quick and easy way. All your entries are stored on Google Drive, so
            however much your drive can store is however long you can journal
            for. You can also look through compilations of images over time.
            Navigate by clicking on your profile after logging in.
          </p>
          <p className='md:w-[600px]'>
            <b>Discloser</b>: Daily Journal&apos;s use and transfer to any other
            app of information received from Google APIs will adhere to{' '}
            <Link
              href='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes'
              className='underline'
              target='_blank'
            >
              Google API Services User Data Policy
            </Link>
            , including the Limited Use requirements.
          </p>
        </div>
      </div>
      <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
        <div>
          <p>Copyright © 2024 - All right reserved by Richard Xiong</p>
          <Link href='/privacy' className='underline'>
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Home;
