import Navofsetting from "./Navofsetting"

const Acount = () => {
  return (
    <div className='p-40'>
      <Navofsetting />
      <h2 className=" font-semibold text-xl">Account settings</h2>
      <div >
        <p className="text-xs text-gray-500 mt-9 mb-1">ACCOUNT PREFERENCES</p>
        <hr className="w-1/2" />
        <div className='flex flex-col mt-7 w-1/2'>
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Email address</p>
              <div className="text-xs text-gray-500">
                ay7aghjc77@gmail.com
              </div>
            </div>
            <div>
              <button type="button" className="text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-20 ">Change</button>

            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Gender</p>
              <div className="text-xs text-gray-500">
                This information may be used to improve your recommendations and ads.
              </div>
            </div>

            <div>
              <form action="/action_page.php">
                <select className=" text-sm">
                  <option value="WOMAN">WOMAN</option>
                  <option value="MAN">MAN</option>
                  <option value="NON-BINARY">NON-BINARY</option>
                  <option value="I refer to myself as...">I refer to myself as...</option>
                  <option value="I PREFER NOT TO SAY">I PREFER NOT TO SAY</option>
                </select>
              </form>



            </div>

          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>

              <div className="flex flex-row">
                <p className=" font-semibold">Display language</p>
                <p className="text-red-500"> (beta)</p>
              </div>

              <div className="text-xs text-gray-500">
                Select the language you&apos;d like to experience the Reddit interface in. Note
                that this won&apos;t change the language of user-generated content and that this
                feature is still in development so translations and UI are still under review.
              </div>


            </div>
          </div>
        </div>
      </div>


      <div >

        <div className='flex flex-col mt-7 w-1/2'>
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Content languages</p>
              <p className="text-xs text-gray-500">
                Add languages you’d like to see posts, community recommendations, and other content in
              </p>

            </div>
            <div>
              <button type="button" className="text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-20 ">Change</button>

            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>


              <p className=" font-semibold">Location customization</p>
              <p className="text-xs text-gray-500">
                Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data.
                <button className="text-sky-600 underline ml-2">
                  Learn more
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>

      <div >
        <p className="text-xs text-gray-500 mt-9 mb-1">CONNECTED ACCOUNTS</p>
        <hr className="w-1/2" />

        <div className='flex flex-col mt-7 w-1/2'>
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connected to Twitter</p>
              <p className="text-xs text-gray-500">You can now choose to share your posts to Twitter from the new post composer.
              </p>

            </div>

            <div className="text-xs text-gray-500">
              <p > @username</p>
              <button type="button" className="text-sky-600 bg-white w-20 ">(disconnect)</button>

            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col ml-10 '>
              <p className=" font-semibold">Show link on profile</p>
              <p className="text-xs text-gray-500">You can show a link to your Twitter account on your profile
              </p>

            </div>

            <div className="mt-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                              peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
              </label>
            </div>


          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connect to Apple</p>
              <p className="text-xs text-gray-500">Connect account to log in to Reddit with Apple
              </p>

            </div>

            <div>

              <button type="button" className=" rounded-full font-semibold text-base w-44 text-white bg-black flex items-center justify-center  ">
                <div className="mr-3">
                  <svg viewBox="0 0 384 512" width="15">
                    <path fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                    </path>
                  </svg>
                </div>

                <p> Connect to Apple </p>
              </button>



            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connected to Google</p>
              <p className="text-xs text-gray-500">Connect account to log in to Reddit with Google
              </p>

            </div>

            <div className="text-xs text-gray-500">

              <button type="button" className="text-sky-600 bg-white w-20 ">(disconnect)</button>

            </div>
          </div>

        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mt-9 mb-1">BETA TESTS</p>
        <hr className="w-1/2" />

        <div className="flex flex-col mt-7 w-1/2">
          <div className="flex flex-row mb-7 justify-between ">
            <div className=" flex flex-col">
              <p className=" font-semibold">Opt into beta tests</p>
              <p className=" text-xs text-gray-500">
                See the newest features from Reddit and join the r/beta community
              </p>
            </div>

            <div className=" mt-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden" />
                <div
                  className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className=" flex flex-col">
              <p className=" font-semibold">Opt out of the redesign</p>
              <p className=" text-xs text-gray-500">
                Revert back to old Reddit for the time being
              </p>
            </div>

            <div className=" mt-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden" />
                <div
                  className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                          peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
                />
              </label>
            </div>
          </div>

        </div>
      </div>


      <div className=" justify-between ">
        <p className="text-xs text-gray-500 mt-9 mb-1">DELETE ACCOUNT</p>
        <hr className="w-1/2" />

        <div className="flex flex-row mb-7 text-xs font-semibold w-1/2 justify-end">


          <button type="button" className="bg-white text-red-500 flex flex-row mt-9 ">

            <svg className=" w-4 h-4"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <p >
              DELETE ACCOUNT
            </p>
          </button>


        </div>

      </div>

    </div>
  )
}

export default Acount
