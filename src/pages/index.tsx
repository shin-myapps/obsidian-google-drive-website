import Head from 'next/head';
import { globalAccessToken, globalRefreshToken } from '@/helpers/state';
import React, { useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Persistence } from '@hookstate/persistence';
import { useHookstate } from '@hookstate/core';
import { Input, success } from '@richardx/components';
import Link from 'next/link';
import { getRootFolderId } from '@/helpers/drive';

const Home: React.FC<{}> = () => {
  const refreshToken = useHookstate(globalRefreshToken);

  const copy = () => {
    navigator.clipboard.writeText(refreshToken.value);
    success('Refresh token copied to clipboard!');
  };

  useEffect(() => {
    globalRefreshToken.attach(Persistence('refreshToken'));
    globalAccessToken.attach(Persistence('accessToken'));
    if (globalRefreshToken.value) getRootFolderId();
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
            Obsidian Google Drive is a plugin that lets you sync your Obsidian
            vault to Google Drive. This was created because iOS does not sync
            with cloud providers well, apart from Obsidian Sync, and the plugins
            that currently work with Google Drive paid or are part of some
            larger, more complicated system. Our sync plugin allows you to sync
            between multiple devices through Google Drive and store the vault
            there. The steps to use this plugin are shown underneath the
            disclaimers. This does NOT sync your <i>.obsidian</i> folder.
          </p>
          <p className='md:w-[600px]'>
            <b>Discloser</b>: Obsidian Google Drive is <b>not</b> an official
            plugin maintained by the Obsidian developers. This is a
            community-made plugin meant to simply add some functionality. Use
            this at your own risk, and make sure to back up your vaults!
          </p>
          <p className='md:w-[600px]'>
            <b>Discloser 2</b>: Do <b>not</b> manually upload files into the
            generated Obsidian Google Drive folder or use some other method of
            Google Drive sync. Our plugin cannot see these files, and it will
            likely break functionality, potentially causing data loss. Instead,
            use this plugin on any device you wish to sync the vault between.
            Also do <b>not</b> manually change files outside of the Obsidian
            app. Our plugin tracks file changes through the Obsidian API, and if
            you change files outside of the app, the plugin will not be able to
            track these changes.
          </p>
          <p className='md:w-[600px]'>
            <b>Discloser 3</b>: <b>Initial</b> activation of this plugin on a
            vault will <b>delete all local files in the vault</b> and replace
            them with the files on Google Drive. If you wish to keep those
            files, move them to another vault and copy them back in after
            syncing. If there is no Google Drive vault, the plugin will create
            one and delete the contents of the local vault. This is ONLY on the
            first activation of the plugin on a vault or when the client is
            behind Google Drive's files.
          </p>
        </div>
      </div>
      <div className='hero bg-blue-300/30 dark:bg-blue-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Refresh Token</h2>
            <p className='md:w-[400px]'>
              Obsidian Google Drive communicates with Google Drive using a
              refresh token. To get this token, sign in on the website (top
              right), and copy the token this website returns. Then, go into the
              Obsidian plugin settings and paste the token into the refresh
              token field. Reload the Obsidian app after doing this.
            </p>
          </div>
          <img
            src='/token.webp'
            alt='Refresh Token'
            className='w-56 rounded-md shadow-lg shadow-black/40 dark:shadow-white/40'
          />
        </div>
      </div>
      <div className='hero bg-purple-300/30 dark:bg-purple-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <img
            src='/sync.webp'
            alt='Sync'
            className='w-56 rounded-md shadow-lg shadow-black/40 dark:shadow-white/40'
          />
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Syncing</h2>
            <p className='md:w-[400px]'>
              Whenever you open Obsidian, the plugin will check for changes on
              Google Drive, and if there are any, it will set the local vault to
              the state of the Google Drive vault. This means that the plugin
              will prioritize changes on Google Drive over changes on the local
              vault. To sync changes from the local vault to Google Drive, press
              the sync button, and it will begin syncing. While you do not have
              to sync before you close Obsidian, we suggest doing so to ensure
              that the vault is up to date, as if another device syncs to the
              vault, it will delete local changes the next time Obsidian is
              opened.{' '}
              <b>
                Make sure to sync with an adequate internet connection as
                closing the app or losing connection while syncing could lead to
                data corruption.
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className='hero bg-teal-300/30 dark:bg-teal-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Github</h2>
            <p className='md:w-[400px]'>
              If you want, you can check out the source code for this plugin{' '}
              <Link
                href='https://github.com/RichardX366/Obsidian-Google-Drive'
                className='underline'
              >
                here
              </Link>
              . You can also check out the source code for this website{' '}
              <Link
                href='https://github.com/RichardX366/Obsidian-Google-Drive-Website'
                className='underline'
              >
                here
              </Link>
              !
            </p>
          </div>
          <img
            src='/github.webp'
            alt='Github'
            className='w-56 h-w-56 rounded-full shadow-lg shadow-black/40 dark:shadow-white/40'
          />
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
