"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const dummyData = [
  {
    title: "SOFTWARE DESIGN ENGINEER INTERNSHIP",
    content:
      "KLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin, libero sit amet tincidunt placerat, purus nulla tincidunt lorem, sit amet mollis sem nibh in urna. Mauris nec finibus felis. Mauris id faucibus nulla, eu egestas neque. Maecenas sed ante erat. Nunc aliquam ante vitae urna tincidunt sollicitudin. Fusce et hendrerit erat, eu malesuada felis. Nam convallis lacinia lectus, sit amet accumsan erat tristique sit amet. Nulla mollis lectus quam, id lobortis nisl pulvinar elementum. Pellentesque sed nunc risus. Sed placerat nunc non augue vulputate, non facilisis ante mollis. Suspendisse sollicitudin scelerisque tortor, a efficitur neque aliquam vel. Vivamus nec justo eget ipsum porttitor scelerisque quis vitae diam. Vestibulum ut nunc dolor. Vestibulum semper vel lorem ut facilisis. Suspendisse iaculis elit quis arcu dapibus elementum.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "Another card",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "SOFTWARE DESIGN ENGINEER INTERNSHIP",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "Another card",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  ,
  {
    title: "SOFTWARE DESIGN ENGINEER INTERNSHIP",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "Another card",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "SOFTWARE DESIGN ENGINEER INTERNSHIP",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "Another card",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "SOFTWARE DESIGN ENGINEER INTERNSHIP",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
  {
    title: "Another card",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    btnText: "Kolay Başvuru",
  },
];

export default function Home() {
  const [token, setToken] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.push("/welcome");
      } else {
        setToken(storedToken);
      }
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-screen flex justify-center py-20 bg-base-100 ">
      <div className="w-screen grid grid-cols-1 gap-4 lg:grid-cols-3 px-10  max-w-[1200px]">
        {dummyData.map((item, index) => (
          <div key={index} className="card shadow-xl w-full bg-primary-content">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.content}</p>
              <button className="btn btn-primary max-w-52 m-auto mt-5">{item.btnText}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

