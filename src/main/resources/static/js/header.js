
const mainBody = document.querySelector('body')

mainBody.innerHTML += (
    `
    <div class="header">
        <div class="logo-wrapper" >
            <p class="home">☰</p>
            <div class="logo">
                <svg width="50px" height="50px" viewBox="0 0 150 150" id="ART" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <style>
                            .cls-1 {
                                fill: none;
                            }
    
                            .cls-1,
                            .cls-2,
                            .cls-4 {
                                stroke: #000000;
                                stroke-linecap: round;
                                stroke-linejoin: round;
                                stroke-width: 4px;
                            }
    
                            .cls-2 {
                                fill: #880d9e;
                            }
    
                            .cls-3 {
                                fill: #ffffff;
                            }
    
                            .cls-4 {
                                fill: #478413;
                            }
                        </style>
                    </defs>
                    <title />
                    <path class="cls-1" d="M75.21,50.92c2.63-10.87,3.5-36.5-6.62-45.13" />
                    <circle class="cls-2" cx="74.88" cy="124.16" r="20.05" />
                    <circle class="cls-2" cx="54.84" cy="93.38" r="20.05" />
                    <circle class="cls-2" cx="94.93" cy="93.38" r="20.05" />
                    <circle class="cls-2" cx="34.91" cy="62.14" r="20.05" />
                    <circle class="cls-2" cx="75" cy="62.14" r="20.05" />
                    <circle class="cls-2" cx="115.09" cy="62.14" r="20.05" />
                    <circle class="cls-3" cx="71.64" cy="119.22" r="7.3" />
                    <circle class="cls-3" cx="51.59" cy="88.43" r="7.3" />
                    <circle class="cls-3" cx="91.68" cy="88.43" r="7.3" />
                    <circle class="cls-3" cx="31.55" cy="57.2" r="7.3" />
                    <circle class="cls-3" cx="71.64" cy="57.2" r="7.3" />
                    <circle class="cls-3" cx="111.73" cy="57.2" r="7.3" />
                    <path class="cls-4" d="M74.63,39.88c5-15.8-26.78-32.17-44.7-20.06C42.49,30.12,48.15,53.6,74.63,39.88Z" />
                </svg>
                <h2>
                    Online Shop
                </h2>
            </div>
        </div>

        <div class="search-wrapper">
            <input  id = 'input-search' placeholder="Tìm" class="input-search" >
            <img id = "btn-search"  class="button" src="/assets/magnifier-svgrepo-com.svg" alt="magnifier" class="magnifier">
        </div>
        <div class="user">
            <span class="">
                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="30px" height="30px" viewBox="0 0 32 32" xml:space="preserve">
                    <style type="text/css">
                        .feather_een{fill:#0B1719;}
                    </style>
                    <path class="feather_een" d="M12,10c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S13.105,10,12,10z M12,13c-0.551,0-1-0.449-1-1
                        s0.449-1,1-1s1,0.449,1,1S12.551,13,12,13z M26.219,23h-0.095C25.401,21.989,25,20.774,25,19.515V14
                        c0-4.414-3.179-8.078-7.371-8.845c0.322-0.454,0.466-1.043,0.305-1.671c-0.184-0.719-0.795-1.297-1.523-1.442
                        C15.126,1.786,14,2.761,14,4c0,0.431,0.139,0.828,0.372,1.154C10.18,5.922,7,9.586,7,14v5.515C7,20.774,6.599,21.989,5.876,23H5.781
                        c-0.459,0-0.859,0.312-0.97,0.757l-0.5,2C4.153,26.388,4.63,27,5.281,27H14l0,0.893c0,0.996,0.681,1.92,1.664,2.08
                        C16.917,30.176,18,29.215,18,28v-1h8.719c0.651,0,1.128-0.611,0.97-1.243l-0.5-2C27.078,23.312,26.678,23,26.219,23z M16,3
                        c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1s-1-0.448-1-1C15,3.448,15.448,3,16,3z M8,19.515V14c0-4.411,3.589-8,8-8s8,3.589,8,8
                        v5.515c0,1.243,0.322,2.436,0.926,3.485H7.074C7.678,21.951,8,20.758,8,19.515z M17,28c0,0.551-0.449,1-1,1s-1-0.449-1-1v-1h2V28z
                        M5.281,26l0.5-2h20.438l0.5,2H5.281z"/>
                </svg>
            </span>
            <span class = "profile">
                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.02958 19.4012C5.97501 19.9508 6.3763 20.4405 6.92589 20.4951C7.47547 20.5497 7.96523 20.1484 8.01979 19.5988L6.02958 19.4012ZM15.9802 19.5988C16.0348 20.1484 16.5245 20.5497 17.0741 20.4951C17.6237 20.4405 18.025 19.9508 17.9704 19.4012L15.9802 19.5988ZM20 12C20 16.4183 16.4183 20 12 20V22C17.5228 22 22 17.5228 22 12H20ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C16.4183 4 20 7.58172 20 12H22C22 6.47715 17.5228 2 12 2V4ZM13 10C13 10.5523 12.5523 11 12 11V13C13.6569 13 15 11.6569 15 10H13ZM12 11C11.4477 11 11 10.5523 11 10H9C9 11.6569 10.3431 13 12 13V11ZM11 10C11 9.44772 11.4477 9 12 9V7C10.3431 7 9 8.34315 9 10H11ZM12 9C12.5523 9 13 9.44772 13 10H15C15 8.34315 13.6569 7 12 7V9ZM8.01979 19.5988C8.22038 17.5785 9.92646 16 12 16V14C8.88819 14 6.33072 16.3681 6.02958 19.4012L8.01979 19.5988ZM12 16C14.0735 16 15.7796 17.5785 15.9802 19.5988L17.9704 19.4012C17.6693 16.3681 15.1118 14 12 14V16Z" fill="#000000"/>
                </svg>
            </span>
        </div>
    </div>`
)