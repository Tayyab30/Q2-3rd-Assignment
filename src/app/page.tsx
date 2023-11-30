"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import { Client, Databases, Query } from "appwrite";
import { useState, useEffect } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState<Array>([]);

  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6565bdd33877379c6991");

  useEffect(() => {
    const databases = new Databases(client);

    let promise = databases.listDocuments("6565beb0b1f395aa0767", "6565bed7acc0e07949a8");

    promise.then(function (response) {
      console.log(response.documents)
        setBlogs(response.documents)
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  console.log(blogs);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blogs.map((blog:any) => (
              <div key={blog.id}>
                <BlogCard
                  imageUrl={blog.image_url}
                  title={blog.title}
                  description={blog.short_desc}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
