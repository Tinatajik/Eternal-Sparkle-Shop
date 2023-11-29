import { Link } from "react-router-dom";
export default function Category() {
  return (
    <>
      <div className="flex justify-center mt-5">
        <h2 className="text-4xl text-[#F95738]">THE ANTIQUE DIAMOND SHAPES</h2>
      </div>
      <div className="mt-5 px-8 text-xl font-bold flex flex-col gap-7 text-[#EE964B]">
        <div className="flex flex-col gap-3">
          <p>OLD EUROPEAN CUT</p>
          <div className="flex gap-5">
            <img
              className="w-[15%]"
              src="https://andriabarbone.com/cdn/shop/files/European_cut_36be2483-e1a4-4b58-94bf-2768dd231f5a_300x.jpg?v=1692297610"
            />
            <Link to="/productPage">
              <div className="flex gap-5">
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.95_front-web_460x.jpg?v=1699909569"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/files/AB_candy_front-web_460x.jpg?v=1699898793"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/files/AB_jen_2.15_front-web_460x.jpg?v=1699648422"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/files/VB_kendra_2.13_front-web_460x.jpg?v=1699646981"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/files/VB_eleni_1.29_front-web_460x.jpg?v=1699384307"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>OLD MINE CUT</p>
          <div className="flex gap-5">
            <img
              className="w-[15%]"
              src="https://andriabarbone.com/cdn/shop/files/Mine_cut_bdf37bf2-24b3-4b59-a1f7-8c9d647cdc22_300x.jpg?v=1692297405"
            />
            <Link to="/productPage">
              <div className="flex gap-5">
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/products/VB_camille_5.52_front-web_460x.jpg?v=1673288796"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/products/VB_allie_1.47_front-web_460x.jpg?v=1678909570"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/products/VB_leilani_front-web_460x.jpg?v=1679335166"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/products/VB_maivet_5.33_front-web_460x.jpg?v=1678901159"
                />
                <img
                  className="w-[18%]"
                  src="https://andriabarbone.com/cdn/shop/products/VB_caria_front-web_460x.jpg?v=1680201664"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
