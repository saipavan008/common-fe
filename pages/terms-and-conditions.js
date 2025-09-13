import React from 'react';

function TermsAndConditions(props) {
    const TitleAndContent = ({title, content, list}) => {
        return (
            <div className="sec-margin">
                <h3 className="">{title}</h3>
                {!!content && <h6 className="mb-0">{content}</h6>}
                {!!list &&
                    <>
                        <h6 className="mb-1">{list[0].title}</h6>
                        <ul>
                            {list[0]?.data?.map((item, index) => (
                                <li key={index} className="mb-1">{item}</li>
                            ))}
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
                    <h1 className="text-center text-white mb-0">Terms & Conditions</h1>
                </div>
            </div>
            <div className="container py-md-5 py-4">
                <div className="card">
                    <TitleAndContent title={'Introduction'}
                                     content={'Welcome to Wash agent ("we," "our," or "us"). By using our car washing booking service, you agree to comply with these Terms & Conditions. Please read them carefully before proceeding.'}/>
                    <TitleAndContent title={'Booking & Payments'}
                                      list={[{
                                          data: ['Users can book a car wash service through our application.' , 'Payment must be made via the available payment options in the app.' , 'Cancellations and refunds are subject to our refund policy.']
                                      }]}/>
                    <TitleAndContent title={'Service Availability'}
                                     list={[{
                                         data: [
                                             'Services are subject to availability and operational hours.' ,
                                             'We reserve the right to cancel bookings due to unforeseen circumstances.'
                                         ]
                                     }]}/>
                    <TitleAndContent title={'User Responsibilities'}
                                     list={[{
                                         data: [
                                             'Users must provide accurate vehicle details for service.',
                                             'The vehicle should be accessible at the scheduled time.'
                                         ]
                                     }]}/>
                    <TitleAndContent title={'Liability & Damage'}
                                     list={[{
                                         data: [
                                             'We take utmost care while washing your vehicle. However, we are not responsible for any pre-existing damages or mechanical issues.' ,
                                             'Any claims for service-related damage must be reported within 24 hours of the service.'
                                         ]
                                     }]}/>
                    <TitleAndContent title={'Changes to Terms'}
                                     list={[{
                                         data: [
                                             'We may update these Terms & Conditions at any time. Users will be notified of significant changes.'
                                         ]
                                     }]}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TermsAndConditions;