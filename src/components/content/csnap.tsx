import { useEffect, useRef, useState } from "react";

import { chakra } from "@chakra-ui/react";

import CSnapService from "../../lib/csnap";
import { LoadContainer } from "../common/load-container";

type TCSnap = {
  world: {
    children: {
      [key: string]: any;
    }[];
  };
};

type Props = {
  base: string;
  coreList: string[];
  whitelist: string[];
  modifiers: string[];
  globalModifiers: string[];
  ide: any;
  setIde: any;
  legacy: boolean;
};
export default function CSnap({
  base,
  coreList,
  whitelist,
  modifiers,
  globalModifiers,
  ide,
  setIde,
  legacy,
}: Props) {
  const csnap = useRef<HTMLIFrameElement>(null);
  const prefix = import.meta.env.PROD ? "/assets/" : "/static/";

  const { data, isLoading, isError } = CSnapService.loadBaseProject(
    `assets/${base}`,
  );

  const [blocks, setBlocks] = useState(null);

  const [ready, setReady] = useState(false);

  const source = legacy
    ? `${prefix}csnap/tutorial.html`
    : `${prefix}csnap_pro/csdt/snap.html`;

  useEffect(() => {
    if (ide) setBlocks(ide.fetchBlockList());
    if (data && ide) {
      ide.loadTutorial(data, false, coreList, whitelist, () => {
        setReady(true);
      });
    }
  }, [data, ide]);

  useEffect(() => {
    if (ide && whitelist) ide.displayTutorialBlocks(coreList, whitelist);
  }, [whitelist]);

  useEffect(() => {
    if (ide && modifiers) {
      modifiers.forEach((mod) => {
        if (typeof ide[mod] === "function") {
          ide[mod]();
        }
      });
    }
  }, [modifiers]);

  useEffect(() => {
    if (ide && modifiers) {
      modifiers.forEach((mod) => {
        if (typeof ide[mod] === "function") {
          ide[mod]();
        }
      });
    }

    if (ide && globalModifiers) {
      globalModifiers.forEach((mod) => {
        if (typeof ide[mod] === "function") {
          ide[mod]();
        }
      });
    }
    if (ide && whitelist) ide.displayTutorialBlocks(coreList, whitelist);
  }, [ready]);

  const checkForWorld = () => {
    if ((csnap?.current?.contentWindow as unknown as TCSnap)?.world?.children) {
      setIde(
        (csnap.current?.contentWindow as unknown as TCSnap)?.world?.children[0],
      );
    }
  };

  return (
    <LoadContainer isLoading={isLoading} isError={isError}>
      <div className="fifth-step my-auto h-full rounded-md border-4 border-dashed border-gray-500">
        <chakra.iframe
          src={source}
          frameBorder="0"
          w={"100%"}
          h={"100%"}
          onLoad={() => checkForWorld()}
          ref={csnap}
        />
      </div>{" "}
    </LoadContainer>
  );
}
