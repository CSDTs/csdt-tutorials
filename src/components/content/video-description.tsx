import { FC, useEffect, useState } from "react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface Conditions {
  tagline?: string;
  source?: string;
}
const VideoDescription: FC<Conditions> = ({ tagline, source }) => {
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (source) {
      fetch(source)
        .then((response) => response.text())
        .then((text) => setDescription(text))
        .catch((error) => console.error(error));
    } else {
      setDescription("");
    }
  }, [source]);

  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-gray-400 bg-opacity-10 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-700 px-4 py-2 text-left text-sm font-medium text-slate-400 hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{tagline}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-slate-500 transition duration-100 ease-linear`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="my-2 max-h-96 overflow-y-auto px-4 pt-4 pb-2 text-base text-gray-500">
                {/* {source} */}
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  children={description}
                  skipHtml
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default VideoDescription;
