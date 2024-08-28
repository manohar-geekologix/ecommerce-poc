import React from 'react'

const Loader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="rounded-lg border bg-card text-card-foreground w-full max-w-lg shadow-md p-6">
                    <div role="status" className="flex items-center justify-center h-72 max-w-sm bg-gray-300 rounded-lg animate-pulse">
                        <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="flex items-center justify-between py-5">
                        <div>
                            <div className="h-3 bg-gray-200 rounded-full-700 w-32"></div>
                            <div className="mt-3 h-3 bg-gray-200 rounded-full-700 w-24"></div>
                        </div>
                        <div className="h-8 ms-2 bg-gray-200 rounded-full-600 w-24"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loader