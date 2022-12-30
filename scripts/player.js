const videoPlayer = document.querySelector(".video_player");

videoPlayer.innerHTML = `
${videoPlayer.innerHTML}
<p class="caption_text"></p>
<div class="thumbnail"></div>
                <div class="progressAreaTime">0:00</div>
                <div class="actions playing">Pause (k)</div>
                <div class="actions next">Suivant (n)</div>
                <div class="actions mute">Couper le son (m)</div>
                <div class="actions cc">Sous-titres (c)</div>
                <div class="actions speed">Reglages</div>
                <div class="actions pip">Incrustation (i)</div>
                <div class="actions fulscreen">Plein écran</div>

                <div class="controls">
                    <div class="progress-area">
                        <div class="progress-bar">
                            <span></span>
                        </div>
                        <div class="buffered-progress-bar"></div>
                    </div>
                    <div class="controls-list">
                        <div class="controls-left">
                            <button class="skip-back">
                              <svg viewBox="0 0 48 48">
                                <path fill="currentColor" d="M24 44q-3.75 0-7.025-1.4-3.275-1.4-5.725-3.85Q8.8 36.3 7.4 33.025 6 29.75 6 26h3q0 6.25 4.375 10.625T24 41q6.25 0 10.625-4.375T39 26q0-6.25-4.25-10.625T24.25 11h-1.1l3.65 3.65-2.1 2.1-7.35-7.35 7.35-7.35 2.05 2.05-3.9 3.9H24q3.75 0 7.025 1.4 3.275 1.4 5.725 3.85 2.45 2.45 3.85 5.725Q42 22.25 42 26q0 3.75-1.4 7.025-1.4 3.275-3.85 5.725-2.45 2.45-5.725 3.85Q27.75 44 24 44Zm-6-11.5V21.9h-2.7v-2.45h5.2V32.5Zm7.35 0q-.95 0-1.575-.625T23.15 30.3v-8.65q0-.95.625-1.575t1.575-.625h4.15q.95 0 1.575.625t.625 1.575v8.65q0 .95-.625 1.575T29.5 32.5Zm.3-2.5h3.55v-8.1h-3.55V30Z"/>
                              </svg>
                            </button>
                            <button class="icon">
                                <i class="fatxt play_pause" title="Lire ou pause (k)">
                                <svg class="play-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                                <svg class="pause-icon" viewBox="0 0 48 48" style="display:none;">
                                    <path   fill="currentColor" d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/>
                                </svg>
                                <svg class="replay-icon" viewBox="0 0 48 48" style="display:none;">
                                    <path   fill="currentColor"  d="M24 44q-3.75 0-7.025-1.4-3.275-1.4-5.725-3.85Q8.8 36.3 7.4 33.025 6 29.75 6 26h3q0 6.25 4.375 10.625T24 41q6.25 0 10.625-4.375T39 26q0-6.25-4.25-10.625T24.25 11H23.1l3.65 3.65-2.05 2.1-7.35-7.35 7.35-7.35 2.05 2.05-3.9 3.9H24q3.75 0 7.025 1.4 3.275 1.4 5.725 3.85 2.45 2.45 3.85 5.725Q42 22.25 42 26q0 3.75-1.4 7.025-1.4 3.275-3.85 5.725-2.45 2.45-5.725 3.85Q27.75 44 24 44Z"/>
                                </svg>
                                </i>
                            </button>
                            <button class="skip-fore">
                            <svg viewBox="0 0 48 48">
                              <path fill="currentColor" d="M18 32.5V21.9h-2.7v-2.45h5.2V32.5Zm7.35 0q-.95 0-1.575-.625T23.15 30.3v-8.65q0-.95.625-1.575t1.575-.625h4.15q.95 0 1.575.625t.625 1.575v8.65q0 .95-.625 1.575T29.5 32.5Zm.3-2.5h3.55v-8.1h-3.55V30ZM24 44q-3.75 0-7.025-1.4-3.275-1.4-5.725-3.85Q8.8 36.3 7.4 33.025 6 29.75 6 26q0-3.75 1.4-7.025 1.4-3.275 3.85-5.725 2.45-2.45 5.725-3.85Q20.25 8 24 8h1.05l-3.9-3.9 2.05-2.05 7.35 7.35-7.35 7.35-2.05-2.05 3.7-3.7H24q-6.25 0-10.625 4.375T9 26q0 6.25 4.375 10.625T24 41q6.25 0 10.625-4.375T39 26h3q0 3.75-1.4 7.025-1.4 3.275-3.85 5.725-2.45 2.45-5.725 3.85Q27.75 44 24 44Z"/>
                            </svg>
                            </button>
                            <div class="volume-container">
                                <button class="volume" title="Couper ou activer le son (m)">
                                    <svg class="volume-high-icon" viewBox="0 0 48 48" >
                                        <path fill="currentColor" d="M28 41.45v-3.1q4.85-1.4 7.925-5.375T39 23.95q0-5.05-3.05-9.05-3.05-4-7.95-5.35v-3.1q6.2 1.4 10.1 6.275Q42 17.6 42 23.95t-3.9 11.225Q34.2 40.05 28 41.45ZM6 30V18h8L24 8v32L14 30Zm21 2.4V15.55q2.75.85 4.375 3.2T33 24q0 2.85-1.65 5.2T27 32.4Zm-6-16.8L15.35 21H9v6h6.35L21 32.45ZM16.3 24Z"/>                                </svg>
                                    <svg class="volume-low-icon" viewBox="0 0 48 48"  style="display:none;">
                                        <path fill="currentColor" d="M10 30V18h8L28 8v32L18 30Zm21 2.4V15.55q2.7.85 4.35 3.2Q37 21.1 37 24q0 2.95-1.65 5.25T31 32.4Zm-6-16.8L19.35 21H13v6h6.35L25 32.45ZM18.9 24Z"/>
                                    </svg>
                                    <svg class="volume-muted-icon" viewBox="0 0 45 45" style="display:none;">
                                        <path fill="currentColor" d="m40.65 45.2-6.6-6.6q-1.4 1-3.025 1.725-1.625.725-3.375 1.125v-3.1q1.15-.35 2.225-.775 1.075-.425 2.025-1.125l-8.25-8.3V40l-10-10h-8V18h7.8l-11-11L4.6 4.85 42.8 43Zm-1.8-11.6-2.15-2.15q1-1.7 1.475-3.6.475-1.9.475-3.9 0-5.15-3-9.225-3-4.075-8-5.175v-3.1q6.2 1.4 10.1 6.275 3.9 4.875 3.9 11.225 0 2.55-.7 5t-2.1 4.65Zm-6.7-6.7-4.5-4.5v-6.5Q30 17 31.325 19.2q1.325 2.2 1.325 4.8 0 .75-.125 1.475-.125.725-.375 1.425Zm-8.5-8.5-5.2-5.2 5.2-5.2Zm-3 14.3v-7.5l-4.2-4.2h-7.8v6h6.3Zm-2.1-9.6Z"/>
                                    </svg>
                                </button>
                                    <input type="range" name="" class="volume_range" min="0" max="100" value="100" step="1" onchange="rangeSlide(this.value)" onmousemove="rangeSlide(this.value)" title="Volume">
                                    <script>
                                        function rangeSlide(value) {
                                            document.getElementById('vol-value').innerHTML = value +"%"
                                        }
                                    </script>
                                    <span id="vol-value" title="Volume">100%</span>
                            </div>
                            <div class="timer" id="timer">
                                <span class="current">0:00</span><span> / </span><span class="duration">0:00</span>
                            </div>
                        </div>
                        <div class="controls-right">
                            <div class="fa auto-play active"></div>
                            <button class="icon closed-caption">
                                <i class="fatxt" title="Sous-titres">
                                <svg viewBox="0 0 55 55">
                                  <path fill="currentColor" d="M12 24.5h3v-3h-3Zm0 6h18v-3H12Zm21 0h3v-3h-3Zm-15-6h18v-3H18ZM7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V11H7v26Zm0 0V11v26Z"/>
                                </svg>
                                </i>
                            </button>
                            <button class=" settingsBtn">
                                <i>
                                <svg viewBox="0 0 48 48">
                                  <path fill="currentColor"d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z"/>
                                </svg>
                                </i>
                            </button>
                            <button class="picture-in-picture">
                                <i class="fatxt kom picture_in_picture">
                                        <svg viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                                    </svg>
                                </i>
                            </button>
                            <button class="toggleFullscreen">
                                <i class="fatxt fa kom fullscreen">
                                <svg class="open" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                </svg>
                                </i>
                                <i class="fatxt fa kom exitFullscreen" style="display:none;">
                                <svg class="close" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                                </svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="loader"></div> 
                
                <div class="settings">
                <div class="wrapper">
                  <ul class="menu-bar">
                    <li class="loop-line">
                      <div class="icon myicons">
                        <span id="loopToggle">
                          <svg
                            class="fabtn noloop"
                            id="loopOff"
                            viewBox="0 0 48 48"
                            style="width: 100%"
                          >
                            <path
                              fill="currentColor"
                              d="m14 44-8-8 8-8 2.1 2.2-4.3 4.3H35v-8h3v11H11.8l4.3 4.3Zm9.3-14.1v-9.45h-2.8V18h5.25v11.9ZM10 21.5v-11h26.2l-4.3-4.3L34 4l8 8-8 8-2.1-2.2 4.3-4.3H13v8Z"
                            />
                          </svg>
                          <svg class="fabtn loop" id="loopOn" viewBox="0 0 48 48">
                            <path
                              fill="currentColor"
                              d="M5 46q-1.2 0-2.1-.9Q2 44.2 2 43V5q0-1.2.9-2.1Q3.8 2 5 2h38q1.2 0 2.1.9.9.9.9 2.1v38q0 1.2-.9 2.1-.9.9-2.1.9Zm9-2 2.1-2.2-4.3-4.3H38v-11h-3v8H11.8l4.3-4.3L14 28l-8 8Zm9.3-14.1h2.45V18H20.5v2.45h2.8ZM10 21.5h3v-8h23.2l-4.3 4.3L34 20l8-8-8-8-2.1 2.2 4.3 4.3H10Z"
                            />
                          </svg>
                        </span>
                      </div>
                      Lecture en boucle
                    </li>
                    <li class="speed-item drop-item" data-drop="speed-drop">
                      <div class="icon myicons">
                        <span id="loopToggle">
                          <svg class="fabtn" viewBox="0 0 48 48">
                            <path
                              fill="currentColor"
                              d="M8.3 36.3q-1.9-2.25-2.975-5.025Q4.25 28.5 4.05 25.5h3.1q.25 2.35 1.1 4.55.85 2.2 2.35 4ZM4.05 21.5q.1-3 1.225-5.75T8.3 10.7l2.3 2.25Q9.15 14.85 8.275 17 7.4 19.15 7.15 21.5Zm18 22.05q-2.95-.4-5.7-1.4-2.75-1-5.1-2.75l2.3-2.4q1.9 1.3 4.05 2.225t4.45 1.325ZM13.65 10l-2.4-2.4q2.4-1.8 5.175-2.775Q19.2 3.85 22.2 3.45v3q-2.35.4-4.5 1.275Q15.55 8.6 13.65 10Zm5.7 22.05v-17.1l13.4 8.55Zm6.85 11.5v-3q6.4-.95 10.6-5.775Q41 29.95 41 23.5t-4.2-11.275Q32.6 7.4 26.2 6.45v-3q7.7.75 12.75 6.525T44 23.5q0 7.75-5.05 13.5T26.2 43.55Z"
                            />
                          </svg>
                        </span>
                      </div>
                      Vitesse de lecture
                      <div class="icon arrow">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
                          />
                        </svg>
                      </div>
                    </li>
                    <li class="quality-item drop-item" data-drop="quality-drop">
                      <div class="icon myicons">
                        <span >
                          <svg class="fabtn" viewBox="0 0 48 48">
                            <path fill="currentColor" d="M21.35 42V30.75h3v4.15H42v3H24.35V42ZM6 37.9v-3h12.35v3Zm9.35-8.3v-4.1H6v-3h9.35v-4.2h3v11.3Zm6-4.1v-3H42v3Zm8.3-8.25V6h3v4.1H42v3h-9.35v4.15ZM6 13.1v-3h20.65v3Z"/>
                          </svg>
                        </span>
                      </div>
                      Qualité
                      <div class="icon arrow">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
                          />
                        </svg>
                      </div>
                    </li>
                    <li class="quality-item drop-item" data-drop="captions-drop">
                      <div class="icon myicons">
                        <span >
                        <svg  class="fabtn nocaption" id="captionOff" viewBox="0 0 48 48" style="width: 100%">
                          <path fill="currentColor" d="M9 40q-1.2 0-2.1-.9Q6 38.2 6 37V11q0-1.2.9-2.1Q7.8 8 9 8h30q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V11H9v26Zm4.5-7.05h7.1q.65 0 1.075-.425.425-.425.425-1.075v-2.1h-2.5v1.1h-5.1v-6.9h5.1v1.1h2.5v-2.1q0-.65-.425-1.075-.425-.425-1.075-.425h-7.1q-.65 0-1.075.425Q12 18.9 12 19.55v8.9q0 .65.425 1.075.425.425 1.075.425Zm13.95 0h7.1q.6 0 1.05-.45.45-.45.45-1.05v-2.1h-2.5v1.1h-5.1v-6.9h5.1v1.1h2.5v-2.1q0-.6-.45-1.05-.45-.45-1.05-.45h-7.1q-.6 0-1.05.45-.45.45-.45 1.05v8.9q0 .6.45 1.05.45.45 1.05.45ZM9 37V11v26Z"/>
                        </svg>
                        </span>
                      </div>
                      Sous-titres
                      <div class="icon arrow">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                  <div class="drop" id="speed-drop">
                    <div class="label">
                      <span class="icon back-icon">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"
                          />
                        </svg>
                      </span>
                      Vitesse de lecture
                    </div>
                    <ul>
                    <li data-speed="0.25">
                      <div class="icon check"></div>
                      0.25
                    </li>
                    <li data-speed="0.5">
                      <div class="icon check"></div>
                      0.5
                    </li>
                    <li data-speed="0.75">
                      <div class="icon check"></div>
                      0.75
                    </li>
                    <li data-speed="1" class="active">
                      <div class="icon check"></div>
                      Standard
                    </li>
                    <li data-speed="1.75">
                      <div class="icon check"></div>
                      1.75
                    </li>
                    <li data-speed="2">
                      <div class="icon check"></div>
                      2
                    </li>
                  </ul>
                  </div>
                  <div class="drop" id="quality-drop">
                    <div class="label">
                      <span class="icon back-icon">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"
                          />
                        </svg>
                      </span>
                      Qualité
                    </div>
                    <ul>
                    <li data-quality="" class="active">
                      <div class="icon check"></div>
                      Auto
                      <p></p>
                    </li>
                  </ul>
                  </div>
                  <div class="drop" id="captions-drop">
                    <div class="label">
                      <span class="icon back-icon">
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"
                          />
                        </svg>
                      </span>
                      Sous-titre
                    </div>
                    <ul></ul>
                  </div>
                </div>
              
                </div>`;
