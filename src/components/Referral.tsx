import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-hot-toast";
import { viewUserIdSelector, viewAccountAddressAtom, loggedInAccountAtom } from "../stores/account.tsx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCodeSVG } from 'qrcode.react';
import { DGGetUser, UserInfo } from '../contract/DailyGame.ts';

const Referral = () => {

    const userId = useRecoilState(viewUserIdSelector);
    const userReferralLink = process.env.REACT_APP_WEBSITE_DOMAIN + '/' + userId[0];
    const [userAddress, setUserAddress] = useRecoilState(viewAccountAddressAtom);
    const currentUserAddress = useRecoilValue(loggedInAccountAtom);
    const [isUserLoading, setUserLoading] = useState<boolean>(false);
    const [referrals, setReferrals] = useState(0);
    const [user, setUser] = useState<UserInfo | null>(null);

    const loadUser = () => {
        if (!userAddress) {
            return;
        }

        setUserLoading(true);

        try {
            DGGetUser(userAddress)
                .then((result) => {
                    setUser(result);
                    setReferrals(result.referrals);
                    setUserLoading(false);
                })
                .catch((e) => {
                    console.error(e);
                    setUserLoading(false);
                    setUser(null);
                });
        } catch (e) {
            console.error(e);
            setUserLoading(false);
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, [userAddress]);

    return (
        <>
            <div className='referral block'>
                <div className='block__title'>Referral</div>
                <div className='referral__content'>
                    <div className='referral__title'>Your referral link</div>
                    <div className='referral__img'>
                        <div className='referral__code'>
                            <QRCodeSVG value={userReferralLink} fgColor="#333852" />
                        </div>
                    </div>
                    <div className='referral__subtitle'>Share your referral code and get bonus BNB</div>
                    <CopyToClipboard text={userReferralLink} onCopy={() => { toast.success('Copied!') }}>
                        <div className='referral__input-item input-item'>
                            <input className='referral__link' type="text" value={userReferralLink} readOnly />
                            <button className='referral__copy input-copy'>
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="4.07129" width="9" height="12.4998" rx="1" strokeWidth="2" />
                                    <path d="M5 1H11C12.1046 1 13 1.89543 13 3V14.4641" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </CopyToClipboard>
                    <div className='referral__count'>
                        {currentUserAddress === userAddress ? 'Your' : 'Total'} invites: {referrals}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Referral;