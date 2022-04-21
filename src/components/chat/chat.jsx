import React from "react";
import Nabvar from "./Navbar";

const chat = () => {
  return (
    <div>
      <Nabvar />
      <div className="container py-5 px-4">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-5 px-0">
            <div className="bg-white">
              <div className="row heading">
                <div className="col-sm-3 col-xs-3 heading-avatar">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                    alt="user"
                    width="50"
                    className="rounded-circle"
                  />
                </div>
                <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                  <i
                    class="fa fa-ellipsis-v fa-2x  pull-right"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                  <i
                    className="fa fa-comments fa-2x  pull-right"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div className="messages-box">
                <div className="list-group rounded-0">
                  <a className="list-group-item list-group-item-action active text-white rounded-0">
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            25 Dec
                          </small>
                        </div>
                        <p className="font-italic mb-0 text-small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            14 Dec
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          Lorem ipsum dolor sit amet, consectetur. incididunt ut
                          labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            9 Nov
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            18 Oct
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            17 Oct
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            2 Sep
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            30 Aug
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-light rounded-0"
                  >
                    <div className="media">
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="mb-0">Jason Doe</h6>
                          <small className="small font-weight-bold">
                            21 Aug
                          </small>
                        </div>
                        <p className="font-italic text-muted mb-0 text-small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-7 px-0">
            <div className="bg-gray px-4 py-2 bg-light hola">
              <div className="icons">
                <div className="col-sm-3 col-xs-3 heading-avatar">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                    alt="user"
                    width="50"
                    className="rounded-circle"
                  />
                </div>

                <div className="col-lg-6 hidden-sm text-right">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-secondary"
                  >
                    <i className="fa fa-camera"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-primary"
                  >
                    <i className="fa fa-image"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-info"
                  >
                    <i className="fa fa-cogs"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-warning"
                  >
                    <i className="fa fa-question"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 chat-box bg-white">
              <div className="media w-50 mb-3">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Hola soy el vendedor del producto que elegiste
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Hola soy el vendedor del producto que elegiste
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 mb-3">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Hola soy el vendedor del producto que elegiste
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Hola soy el vendedor del producto que elegiste
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 mb-3">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">Hola</p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Hola soy el vendedor del producto que elegiste
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>
            </div>

            <form action="#">
              <div className="row reply">
                <div className="col-sm-1 col-xs-1 reply-emojis">
                  <i className="fa fa-smile-o fa-2x"></i>
                </div>
                <div className="col-sm-9 col-xs-9 reply-main">
                  <textarea
                    className="form-control"
                    rows="1"
                    id="comment"
                  ></textarea>
                </div>
                <div className="col-sm-1 col-xs-1 reply-recording">
                  <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
                </div>
                <div className="col-sm-1 col-xs-1 reply-send">
                  <i className="fa fa-send fa-2x" aria-hidden="true"></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
