import React from 'react'

import main_image from '../assets/main_image.png'

import './LandingPage.css'

export const LandingPage = () => {
  return (
    <>
      <div className='background'></div>
      <div className='background_bubbles'>
        <div className='background_bubbles_first'>
          <div className='background_bubbles_first_one'></div>
          <div className='background_bubbles_first_two'></div>
          <div className='background_bubbles_first_three'></div>
          <div className='background_bubbles_first_four'></div>
          <div className='background_bubbles_first_five'></div>
        </div>
        <div className='background_bubbles_second'>
          <div className='background_bubbles_second_one'></div>
          <div className='background_bubbles_second_two'></div>
          <div className='background_bubbles_second_three'></div>
          <div className='background_bubbles_second_four'></div>
          <div className='background_bubbles_second_five'></div>
        </div>
      </div>
      <div className='landing_page'>


        <div className='landing_page_header'>
          <div className='landing_page_header_left'>
            <div className='landing_page_header_left_text'>Pack Points</div>
          </div>
          <div className='landing_page_header_right'>
            <div className='landing_page_header_right_three'>
              <div className='landing_page_header_right_three_left'>About Us</div>
              <div className='landing_page_header_right_three_middle'>Calendar</div>
              <div className='landing_page_header_right_three_right'>Image Gallery</div>
            </div>
            <div className='landing_page_header_right_button'>
              <div className='landing_page_header_right_button_text'>Leaderboard</div>
            </div>
          </div>
        </div>

        <div className='landing_page_welcome'>
          <div className='landing_page_welcome_dots'>
            <div className='dot1'></div>
            <div className='dot2'></div>
            <div className='dot3'></div>
            <div className='dot4'></div>
            <div className='dot5'></div>
            <div className='dot6'></div>
            <div className='dot7'></div>
            <div className='dot8'></div>
          </div>
          <div className='landing_page_welcome_primary'>
            <div className='landing_page_welcome_primary_actual'>
              <div className='split1'>
                <div className='split1_di'>
                  <div className='split1_header'>Welcome to the Pack Points Website!👋</div>
                </div>
              </div>
              <div className='split2'>
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
          </div>
        </div>
        <div className='landing_page_emojis'>

        </div>
        <div className='landing_page_aboutus'>

        </div>
        <div className='landing_page_footer'>

        </div>
        
      </div>
    </>
  )
}