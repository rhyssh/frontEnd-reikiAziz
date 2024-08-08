import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { format } from 'date-fns';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './ListPost.css'; // Tambahkan CSS untuk ellipsis
import Banner from './Banner';
import Pagination from './Pagination';
import Navbar from './Navbar';

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0); // State untuk total jumlah post
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('-published_at');
    const [totalPages, setTotalPages] = useState(1); // State untuk total halaman

    useEffect(() => {
        fetchPosts();
    }, [page, pageSize, sort]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
                params: {
                    'page[number]': page,
                    'page[size]': pageSize,
                    'append[]': ['small_image', 'medium_image'],
                    sort: sort
                }
            });
            console.log(response.data); // Menampilkan data JSON di konsol

            // Mengambil total item dari response meta
            const totalItems = response.data.meta.total; // Asumsi: total item tersedia di response meta
            setTotalPosts(totalItems);

            // Perbarui totalPages berdasarkan total item dan pageSize
            const totalPages = Math.ceil(totalItems / pageSize);
            setTotalPages(totalPages);
            setPosts(response.data.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const image = 'https://images.unsplash.com/photo-1723001652492-b718bda91aaa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <>
            <Banner imageUrl={image} title="Ideas" desc="Where all our great things begin" />
            <div className="container mx-auto p-4 lg:px-24">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-4">
                    <p >
                        Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalPosts)} of {totalPosts}
                    </p>
                    <div className="flex gap-5 mb-4">
                        <div>
                            <label htmlFor="limit">Limit : </label>
                            <select id='limit' className='border p-2 rounded-full px-3' onChange={(e) => setPageSize(parseInt(e.target.value, 10))} value={pageSize}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className='space-x-3'>
                            <label htmlFor="time">Sort by :</label>
                            <select className='border p-2 rounded-full px-3' id='time' onChange={(e) => setSort(e.target.value)} value={sort}>
                                <option value="-published_at">Terbaru</option>
                                <option value="published_at">Terlama</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map(post => {
                        const formattedDate = format(new Date(post.published_at), 'dd MMMM yyyy'); // Format tanggal
                        return (
                            <div key={post.id} className="border rounded-lg overflow-hidden">
                                {post.small_image.length > 0 && (
                                    <LazyLoadImage
                                        src={post.small_image[0].url}
                                        alt={post.title}
                                        effect="blur"
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <p className="text-gray-600">{formattedDate}</p> {/* Tanggal publikasi */}
                                    <h2 className="text-xl font-bold truncate-3-lines">{post.title}</h2>
                                    <p>{post.summary}</p> {/* Ganti dengan summary jika ada */}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="container mx-auto p-4">
                    {/* Konten post */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </div>
            </div>
        </>
    );
};

export default ListPost;
