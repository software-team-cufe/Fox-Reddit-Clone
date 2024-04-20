import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";

export default function NotFoundPage({ }) {


    return (
        <div className="w-screen p-4 h-screen flex flex-col items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-11">
                <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-10">
                    <img className=" w-1/2 lg:w-auto " src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    <div className="flex flex-col">
                        <h1 className="my-2  font-bold text-2xl">
                            This page is not available.
                        </h1>
                        <p className="my-2 ">
                            We're sorry for the inconvenience! You can visit the homepage to access your destination correctly.
                        </p>
                        <br />
                        <Link to='/'>
                            <Button color="var(--primary)" className="mx-auto" textColor="white" verticalPadding={15} horizontalPadding={30} fontSize="1.1rem" >
                                Homepage
                            </Button>
                        </Link>
                    </div>
                </div>

                <img className="lg w-1/2 lg:w-auto " src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>

        </div>

    )
}
