import { Share } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { LogoIcon } from '../../icons/LogoIcon/logoIcon';

/**
 * This is a component to hold UTD Trends branding and basic navigation
 * @returns
 */
export function TopMenu() {
  const router = useRouter();
  const [openCopied, setOpenCopied] = useState<boolean>(false);

  function shareLink(url: string) {
    if (navigator.share) {
      navigator
        .share({
          title: 'UTD Trends',
          url: url,
        })
        .catch(() => copyLink(url));
    } else {
      copyLink(url);
    }
  }
  function copyLink(url: string) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => setOpenCopied(true))
        .catch(() => alertLink(url));
    } else {
      alertLink(url);
    }
  }
  function alertLink(url: string) {
    alert(url);
  }

  return (
    <>
      <div className="bg-primary h-16 text-light relative py-2 px-4">
        <div className="h-full flex min-w-fit justify-between">
          <Link href="/" className="m-2">
            <div className="h-full flex align-middle place-items-center justify-center">
              <div className="h-full float-left mr-2 w-7">
                <LogoIcon />
              </div>
              <h1 className=" float-right text-xl">UTD Trends</h1>
            </div>
          </Link>
          <IconButton
            className="w-12"
            size="large"
            onClick={() => {
              let url = window.location.href;
              if (
                router.query &&
                Object.keys(router.query).length === 0 &&
                Object.getPrototypeOf(router.query) === Object.prototype
              ) {
                url = 'https://trends.utdnebula.com/';
              }
              shareLink(url);
            }}
          >
            <Share className="fill-white text-3xl mr-1" />
          </IconButton>
        </div>
      </div>
      <Snackbar
        open={openCopied}
        autoHideDuration={6000}
        onClose={() => setOpenCopied(false)}
        message="Copied!"
      />
    </>
  );
}

export default TopMenu;
