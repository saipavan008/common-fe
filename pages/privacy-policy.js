import React from 'react';

function PrivacyPolicy(props) {

    const TitleAndContent = ({title, content, list}) => {
        return (
            <div className="sec-margin">
                <h3 className="">{title}</h3>
                {!!content && <h6 className="mb-0">{content}</h6>}
                {!!list &&
                    <>
                        { !!list[0].title && <h6 className="mb-1">{list[0].title}</h6>}
                        <ul className="mb-0">
                            {list[0]?.data?.map((item, index , arr) => {

                                const isLast = arr.length - 1 === index;

                                return (
                                    <li key={index} className={`${isLast ? '' : 'mb-1'}`}>{item}</li>
                                )
                            })}
                        </ul>
                    </>
                }
            </div>
        )
    };

    return (
        <React.Fragment>
            <div className="col-12 privacy-terms-banner-card">
                <div className="container">
                    <h1 className="text-center text-white mb-0">Privacy Policy</h1>
                </div>
            </div>
            <div className="container py-md-5 py-4">
            <div className="card">
                    <TitleAndContent title={'Introduction'}
                                     content={'This Privacy Policy explains how we collect, use, and protect your personal information when you use Wash agent.'}/>
                <TitleAndContent title={'Information We Collect'}
                                 list={[{
                                     data: [
                                         'Personal Information: Name, contact details, and payment information.',
                                         'Vehicle Details: Car model, license plate, and service preferences.' ,
                                         'Usage Data: Information about how you use our app.'
                                     ]
                                 }]}/>
                <TitleAndContent title={'How We Use Your Information'}
                                 list={[{
                                     data: [
                                         'To process bookings and payments.',
                                         'To improve our services and user experience.',
                                         'To send notifications and promotional offers.'
                                     ]
                                 }]}/>
                <TitleAndContent title={'Data Protection'}
                                 list={[{
                                     data: [
                                         'We implement security measures to protect user data.' ,
                                         'Payment transactions are encrypted and processed securely.'
                                     ]
                                 }]}/>
                <TitleAndContent title={'Sharing of Information'}
                                 list={[{
                                     data: [
                                         'We do not sell or share your personal data with third parties except for service fulfillment and legal compliance.'
                                     ]
                                 }]}/>
                <TitleAndContent title={'Your Rights'}
                                 list={[{
                                     data: [
                                         'You can update or delete your data through the app settings.' ,
                                         'You may opt out of promotional communications at any time.'
                                     ]
                                 }]}/>
                <TitleAndContent title={'Changes to Privacy Policy'}
                                 list={[{
                                     data: [
                                         'We may update this policy periodically. Continued use of the service implies acceptance of the changes.'
                                     ]
                                 }]}/>
            </div>
            </div>
        </React.Fragment>
    );
}

export default PrivacyPolicy;