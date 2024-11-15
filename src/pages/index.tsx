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
        <title>OGD Sync</title>
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
          <h2 className='text-4xl font-bold'>OGD Sync</h2>
          <p className='md:w-[600px]'>
            OGD Sync is a plugin that lets you sync your Obsidian vault to
            Google Drive. This was created because iOS does not sync with cloud
            providers well, apart from Obsidian Sync, and the plugins that
            currently work with Google Drive are paid or part of some larger,
            more complicated system. Our sync plugin allows you to sync between
            multiple devices through Google Drive and store your vault there.
            You retain a local copy of the vault on whichever devices you use,
            and your data never reaches our eyes. It is safely stored on your
            devices and Google Drive, and our servers only serve as a way to
            exchange refresh keys for access keys (your data never passes
            through our servers). Please read the instructions below as well as
            the <b>WARNING</b>!
          </p>
          <p className='md:w-[600px]'>
            <b>Note</b>: OGD Sync is <b>not</b> an official plugin maintained by
            the Obsidian developers. This is a community-made plugin meant to
            simply add some functionality. Use this at your own risk, and make
            sure to back up your vaults! This plugin also only syncs files and
            folders, not the <i>.obsidian</i> config folder.
          </p>
        </div>
      </div>
      <div className='hero bg-sky-300/30 dark:bg-sky-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Setup</h2>
            <p className='md:w-[400px]'>
              OGD Sync communicates with Google Drive using a refresh token. To
              get this token, sign in on the website (top right), and copy the
              token this website returns. Then, go into the Obsidian plugin
              settings and paste the token into the refresh token field. Make
              sure the vault you&apos;re syncing into is empty. Then, reload the
              Obsidian app.
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
            src='/download.webp'
            alt='Download'
            className='w-56 rounded-md shadow-lg shadow-black/40 dark:shadow-white/40'
          />
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Setup (New Device)</h2>
            <p className='md:w-[400px]'>
              If you already used this plugin on a different device and want to
              sync those notes onto a new one, then you should manually sync the
              vault the first time. To do this, download the vault from Google
              Drive, move the contents to an empty local vault, and then sync
              the vault. This will ensure that the local vault is up to date
              with the Google Drive vault. You should do this before entering
              the refresh token. If you want the plugin to run the initial sync
              (much slower), then just enable the plugin on an empty vault.
            </p>
          </div>
        </div>
      </div>
      <div className='hero bg-teal-300/30 dark:bg-teal-700/50 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Setup (Existing Notes)</h2>
            <p className='md:w-[400px]'>
              If you have existing notes that you want to sync to Google Drive,
              then first move them into a new vault. Follow the above procedures
              for setup, and then copy the notes back into the vault THROUGH THE
              OBSIDIAN APP. You MUST do the copying through the Obsidian app, or
              else the plugin will break.
            </p>
          </div>
          <img
            src='/obsidian.webp'
            alt='Obsidian'
            className='w-56 rounded-md'
          />
        </div>
      </div>
      <div className='hero bg-indigo-300/30 dark:bg-indigo-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <img src='/drive.webp' alt='Drive' className='w-56 rounded-md' />
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Syncing (Pull)</h2>
            <p className='md:w-[400px]'>
              Whenever you open Obsidian or run the pull command through the
              command palette, the plugin will check for changes on Google
              Drive, and if there are any, it will pull those changes. If there
              are any conflicts, the plugin will have local changes override
              cloud changes except for file deletion. If a file
              creation/modification is being pulled with the client having
              locally deleted the file, the plugin will bring the file back to
              match the cloud state. You can also revert changes to the cloud
              state by running the reset command through the command palette.{' '}
              <b>
                Make sure to sync with an adequate internet connection as
                closing the app or losing connection while syncing could lead to
                data corruption.
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className='hero bg-green-300/30 dark:bg-green-700/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Syncing (Push)</h2>
            <p className='md:w-[400px]'>
              To sync changes from the local vault to Google Drive, press the
              sync button or run the push command through the command palette,
              and it will begin syncing. While you do not have to sync before
              you close Obsidian, we suggest doing so to ensure that the vault
              is up to date. When you try to push, the plugin will first pull
              changes from the cloud.
            </p>
          </div>
          <img
            src='/sync.webp'
            alt='Sync'
            className='w-56 rounded-md shadow-lg shadow-black/40 dark:shadow-white/40'
          />
        </div>
      </div>
      <div className='hero bg-violet-300/30 dark:bg-violet-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <img
            src='/vaults.webp'
            alt='Vaults'
            className='w-56 aspect-square object-cover rounded-full shadow-lg shadow-black/40 dark:shadow-white/40'
          />
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Multiple Vaults</h2>
            <p className='md:w-[400px]'>
              To sync multiple vaults, simply enable the plugin on vaults with
              different names. Our plugin syncs together vaults that have the
              same name, so if you want to sync a new device to an existing
              vault, just make sure the vault has the same name. Feel free to
              change the name of the Google Drive folder our plugin creates, but
              we suggest keeping it the same as the vault name to avoid
              confusion.
            </p>
          </div>
        </div>
      </div>
      <div className='hero bg-cyan-300/30 dark:bg-cyan-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Renaming Vaults</h2>
            <p className='md:w-[400px]'>
              If you are using our plugin to sync, you{' '}
              <b>cannot directly rename vaults anymore</b>. This is because our
              plugin uses the name of the vault to properly sync. If you want to
              change a vault name, create a new vault with the new name, set up
              its sync, and move the contents <b>through the Obsidian app</b>.
            </p>
          </div>
          <img
            src='/rename.webp'
            alt='Rename'
            className='w-56 h-w-56 rounded-full bg-white shadow-lg shadow-black/40 dark:shadow-white/40'
          />
        </div>
      </div>
      <div className='hero bg-red-300/30 dark:bg-red-900/30 py-12 px-8'>
        <div className='hero-content flex-col md:flex-row text-center md:text-left md:gap-12'>
          <img src='/warning.webp' alt='Warning' className='w-56 rounded-md' />
          <div className='flex flex-col items-center md:items-start gap-4'>
            <h2 className='text-3xl font-bold'>Warning</h2>
            <p className='md:w-[400px]'>
              Do <b>not</b> manually upload files into the generated OGD Sync
              folder or use some other method of Google Drive sync. Our plugin
              cannot see these files, and it will likely break functionality,
              potentially causing data loss. Instead, use this plugin on any
              device you wish to sync the vault between. Also do <b>not</b>{' '}
              manually change files outside of the Obsidian app. Our plugin
              tracks file changes through the Obsidian API, and if you change
              files outside of the app, the plugin will not be able to track
              these changes.
            </p>
          </div>
        </div>
      </div>
      <div className='hero bg-cyan-300/30 dark:bg-teal-900/60 py-12 px-8'>
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
              . Feel free to make suggestions and pull requests! You can also
              check out the source code for this website{' '}
              <Link
                href='https://github.com/RichardX366/Obsidian-Google-Drive-Website'
                className='underline'
              >
                here
              </Link>
              . If you want to verify any of our claims about data security, you
              can check through both Github repositories to see for yourself.
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
