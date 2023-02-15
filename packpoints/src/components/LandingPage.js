import React from 'react'

import { useNavigate } from 'react-router-dom'

import main_image from '../assets/main_image.png'
import main_image_2 from '../assets/main_image_2.png'
import wolf from '../assets/wolf.png'
import calendar from '../assets/calendar_emoji.png'
import trophy from '../assets/trophy.png'
import onehundred from '../assets/onehundred.png'
import questionmark from '../assets/questionmark.png'
import doublebang from '../assets/doublebang.png'

import './LandingPage.css'

export const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <>
      {/* <div className='background'></div> */}
      {/* <div className='background_bubbles'> */}
        {/* <div className='background_bubbles_first'> */}
          <div className='background_bubbles_first_one'></div>
          <div className='background_bubbles_first_two'></div>
          <div className='background_bubbles_first_three'></div>
          <div className='background_bubbles_first_four'></div>
          <div className='background_bubbles_first_five'></div>
        {/* </div> */}
        {/* <div className='background_bubbles_second'> */}
          <div className='background_bubbles_second_one'></div>
          <div className='background_bubbles_second_two'></div>
          <div className='background_bubbles_second_three'></div>
          <div className='background_bubbles_second_four'></div>
          <div className='background_bubbles_second_five'></div>
        {/* </div> */}
      {/* </div> */}



      <div className='landing_page'>
        {/* <div className='background_bubbles_second_one'></div>
        <div className='background_bubbles_second_two'></div>
        <div className='background_bubbles_second_three'></div>
        <div className='background_bubbles_second_four'></div>
        <div className='background_bubbles_second_five'></div>
        <div className='background_bubbles_first_one'></div>
        <div className='background_bubbles_first_two'></div>
        <div className='background_bubbles_first_three'></div>
        <div className='background_bubbles_first_four'></div>
        <div className='background_bubbles_first_five'></div> */}
        <div className='landing_page_header'>
          <div className='landing_page_header_left'>
            <div className='landing_page_header_left_text'>Pack Points</div>
          </div>
          <div className='landing_page_header_right'>
            <div className='landing_page_header_right_three'>
              <div className='landing_page_header_right_three_left' onClick={() => {
                window.location.href = 'https://unr.campuslabs.com/engage/'
              }}>Pack Life</div>
              <div className='landing_page_header_right_three_middle' onClick={() => {
                navigate('calendar')
              }}>Calendar</div>
              <div className='landing_page_header_right_three_right' onClick={() => {
                navigate('info')
              }}>Image Gallery</div>
            </div>
            <div className='landing_page_header_right_button' onClick={() => {
              navigate('leaderboard'); 
            }}>
              <div className='landing_page_header_right_button_text'>Leaderboard</div>
            </div>
          </div>
        </div>


        <div className='landing_page_welcome_primary'>
          <div className='welcome_left'>
              <div className='split1_header'>
                Welcome to the Pack Points Website!👋
              </div>
              <div className='top'>
                <div className='top_circle'></div>
                <div className='top_text'>
                  <div className='top_top'>Blue Tier -- 100 Points</div>
                  <div className='top_bottom'>
                    Attend Academic Mentor Study Hours<br/>
                    Attend Leadership Council Meetings
                  </div>
                </div>
              </div>
              <div className='middle'>
                <div className='middle_circle'></div>
                <div className='middle_text'>
                  <div className='middle_top'>Silver Tier -- 80 Points</div>
                  <div className='middle_bottom'>
                    Attend Academic Mentor Events<br/>
                    Attend specific RHA events<br/>
                    Attend specific Residence Hall Events
                  </div>
                </div>
              </div>
              <div className='bottom'>
                <div className='bottom_circle'></div>
                <div className='bottom_text'>
                  <div className='bottom_top'>White Tier -- 50 Points</div>
                  <div className='bottom_bottom'>
                    Scan QR Codes on Bulletin Boards<br/>
                    Participate in Residential Life tabling events<br/>
                    Participate in Join The Pack Events led by RAs
                  </div>
                </div>
              </div>
            </div>
            <img 
              src={main_image} 
              alt='person holding pack points' 
              className='main_image'
            />
          </div>



        <div className='landing_page_emojis'>
          <div className='emojis_left'>
            <div className='emojis_left_image'>
              <img src={wolf} alt='emoji of wolf' className='wolf' onClick={() => {
                window.location.href = 'https://unr.campuslabs.com/engage/'
              }}/>
            </div>
            <div className='emojis_left_text'>
              <div className='emojis_left_text_top'>
                Sense of Community!
              </div>
              <div className='emojis_left_text_bottom'>
                Partake in residential communties, make friends, and earn points!
              </div>
            </div>
          </div>
          <div className='emojis_middle'>
            <div className='emojis_middle_image'>
                <img src={calendar} alt='emoji of calendar' className='calendar' onClick={() => {
                  navigate('calendar')
                }}/>
              </div>
              <div className='emojis_middle_text'>
                <div className='emojis_middle_text_top'>
                  Upcoming Events!
                </div>
                <div className='emojis_middle_text_bottom'>
                  Head to the live calendar where you can see upcoming events
                </div>
            </div>
          </div>
          <div className='emojis_right'>
            <div className='right_emojis_trophy'>
              <div className='emojis_right_image'>
                <img src={trophy} alt='emoji of trophy' className='trophy' onClick={() => {
                  navigate('leaderboard')
                }}/>
              </div>
            </div>
            <div className='emojis_right_text'>
              <div className='emojis_right_text_top'>
                Earn Prizes!
              </div>
              <div className='emojis_right_text_bottom'>
                Checkout the leaderboard to see how close you are to the top!
              </div>
            </div>
          </div>
        </div>


        <div className='landing_page_aboutus'>
          <div className='aboutus_header'>
          <img src={main_image_2} alt='person looking at robot' className='main_image_2'/>
          </div>
          <div className='aboutus_explanation'>
            <div className='header_text'>
              About Us! 😊 
            </div>
            <div className='explanation_top'>
              <img src={questionmark} alt='question mark emoji' className='questionmark'/>
              <div className='explanation_top_text'>
                <div className='explanation_top_top'>
                  Why We Started
                </div>
                <div className='explanation_top_bottom'>
                  To give back to our community. It's as simple as that. At Residential Life, we believe that those who support each other should be rewarded for their contributions. Whether you support a Resident Assistant's event or an Academic Mentor's study hours, you are taking the time to build a strong residential community with those around you.
                </div>
              </div>
            </div>
            <div className='explanation_middle'>
              <img src={doublebang} alt='doublebang emoji' className='doublebang'/>
              <div className='explanation_middle_text'>
                <div className='explanation_middle_top'>
                  Our Goals
                </div>
                <div className='explanation_middle_bottom'>
                  Our main goal is to have as many students as possible, that live on campus, participate in Pack Points. With an increase in participants we would be able to give back even more to the community!
                </div>
              </div>
            </div>
            <div className='explanation_bottom'>
              <img src={onehundred} alt='onehundred emoji' className='onehundred'/>
              <div className='explanation_bottom_text'>
                <div className='explanation_bottom_top'>
                  The Team
                </div>
                <div className='explanation_bottom_bottom'>
                  This project was visualized by the Academic Mentors. Specifically the two AMs working for Hall Currency who built the entire program and this website from scratch. Resident Assistant's also have made this possible by holding events as well as providing the QR codes to gain points. Last but not least, Residential Life has also played a role in giving us this great opportunity to build this program.
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className='landing_page_footer'>
          <div className='footer_line'></div>
          <div className='footer_content'>
            <div className='footer_content_left'>
              <div className='content_left'>Pack Points</div>
            </div>
            <div className='footer_content_right'>
              <div className='content_right_three'>
                <div className='content_right_au' onClick={() => {
                  window.location.href = 'https://unr.campuslabs.com/engage/'
                }}>Pack Life</div>
                <div className='content_right_cal' onClick={() => {
                  navigate('calendar')
                }}>Calendar</div>
                <div className='content_right_ig' onClick={() => {
                  navigate('info')
                }}>Image Gallery</div>
              </div>
              <div className='content_right_button' onClick={() => {
                navigate('leaderboard');
              }}>
                <div className='right_button_con'>Leaderboard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}