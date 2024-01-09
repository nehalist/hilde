import { LuSwords } from "react-icons/lu";
import { Avatar, User } from "@nextui-org/react";

export function LeagueFeed() {
  return (
    <div className="relative text-center">
      <span
        className="absolute mx-auto h-full w-0.5 bg-gray-200 z-0"
        aria-hidden="true"
      />
      <div className="py-7 z-10 relative">
        <div className="flex justify-center items-center gap-3">
          <div className="w-1/3 relative -right-10 z-10 h-12 flex items-center justify-end pr-12">
            <div className="flex justify-center items-center">
              <User
                name={
                  <>
                    Kevin Hirczy <b>kh</b>
                  </>
                }
                description="Dude of Whatever"
                avatarProps={{ name: "kh", size: "sm" }}
              />
            </div>
            <div className="text-xl leading-6 font-bold ml-6 text-gray-500">
              3
            </div>
          </div>
          <div className="rounded-full bg-white border w-12 h-12 flex justify-center items-center text-xl z-20">
            <LuSwords />
          </div>
          <div className="w-1/3 relative -left-10 z-10 h-12 flex items-center justify-start pl-12 bg-gradient-to-r from-green-100">
            <div className="flex justify-center items-center">
              <div className="text-xl leading-6 font-bold mr-6">
                8
              </div>
              <User
                name={
                  <>
                    Anna Lickl <b>al</b>
                  </>
                }
                description="Dudette of Whatever"
                avatarProps={{ name: "al", size: "sm" }}
              />
            </div>
          </div>
        </div>
        <div className="my-7">
          <div className="bg-white rounded border h-12 w-1/2 mx-auto flex justify-center items-center gap-2">
            <Avatar size="sm" />
            <b>Daniel Leeb (dl)</b> has joined the league
          </div>
        </div>
        <div className="my-7">
          <div className="bg-white rounded border h-12 w-1/2 mx-auto flex justify-center items-center gap-2">
            Something of ridiculous great importance has happened
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="w-1/3 relative -right-10 z-10 h-12 flex items-center justify-end pr-12 bg-gradient-to-l from-green-100">
            <div className="flex justify-center items-center">
              <User
                name={
                  <>
                    Kevin Hirczy <b>kh</b>
                  </>
                }
                description="Dude of Whatever"
                avatarProps={{ name: "kh", size: "sm" }}
              />
            </div>
            <div className="text-xl leading-6 font-bold ml-6 text-gray-500">
              8
            </div>
          </div>
          <div className="rounded-full bg-white border w-12 h-12 flex justify-center items-center text-xl z-20">
            <LuSwords />
          </div>
          <div className="w-1/3 relative -left-10 z-10 h-12 flex items-center justify-start pl-12">
            <div className="flex justify-center items-center">
              <div className="text-xl leading-6 font-bold mr-6">
                1
              </div>
              <User
                name={
                  <>
                    Anna Lickl <b>al</b>
                  </>
                }
                description="Dudette of Whatever"
                avatarProps={{ name: "al", size: "sm" }}
              />
            </div>
          </div>
        </div>
        <div className="my-7">
          <div className="bg-white rounded border h-12 w-1/2 mx-auto flex justify-center items-center gap-2">
            Time has begun. Tick. Tock.
          </div>
        </div>
      </div>
    </div>
  );
}
