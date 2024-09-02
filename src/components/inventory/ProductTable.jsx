'use client'
import Image from "next/image";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext, MdOutlineModeEdit } from "react-icons/md";
import { RiArrowDropRightLine, RiDeleteBin6Line } from "react-icons/ri";

const ProductTable = ({ filteredProducts, handleDelete, currentPage, setCurrentPage, itemsPerPage, activeCategory }) => {

  // Calculate the indices of the products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startItem = indexOfFirstProduct + 1;
  const endItem = indexOfLastProduct > filteredProducts.length ? filteredProducts.length : indexOfLastProduct;

  return (
    <>
      <div className="-m-1.5 overflow-x-auto px-6 max-md:hidden">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-nowrap">
              <thead>
                <tr>
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">S.No.</th>
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Image</th>
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Name</th>
                  {activeCategory == 'All' && (
                    <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Category</th>
                  )}
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Brand</th>
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Availability</th>
                  <th className="px-3 xxl:px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Stock Left</th>
                  <th className="px-3 xxl:px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Price</th>
                  <th className="px-3 xxl:px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Weight</th>
                  <th className="px-3 xxl:px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Action</th>
                  <th className="px-3 xxl:px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length ? (
                  currentProducts.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="px-3 xxl:px-6 whitespace-nowrap text-sm">
                        <Image
                          width={100}
                          height={100}
                          src={item.images[0]}
                          alt={item.title}
                          className="bg-gray-200 w-12 h-12 object-cover"
                          onError={(e) => e.target.src = '/path/to/placeholder-image.png'}
                        />
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                        <Link href={`/product/${item.id}?label=inventory`} className="hover:text-[#213B85]">
                          {item.title}
                        </Link>
                      </td>
                      {activeCategory == 'All' && (
                        <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm text-gray-800">
                          {item.category || "-"}
                        </td>
                      )}
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm text-gray-800">
                        {item.brand || "-"}
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm">
                        <span
                          className={`rounded-2xl text-xs py-1 border ${item.availabilityStatus === "In Stock"
                            ? "text-[#09AD95] bg-[#E6F7F4] px-3.5 border-[#A3E9D1]"
                            : "text-[#DC3545] bg-[#FDE9EC] border-[#FFC6CE] px-2"
                            }`}
                        >
                          {item.availabilityStatus}
                        </span>
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-center text-sm text-gray-800">
                        {item.stock}
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-sm text-gray-800">
                        $ {item.price}
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-center text-sm text-gray-800">
                        {item.weight}
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-base font-semibold border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 bg-[#E7F0FC] p-1.5 rounded-full border-[#C3DDFF]"
                        >
                          <MdOutlineModeEdit />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-base font-semibold border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 ml-2 bg-[#FDE9EC] p-1.5 rounded-full border-[#FFC6CE]"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                      <td className="px-3 xxl:px-6 py-5 whitespace-nowrap text-center text-sm font-medium">
                        <Link href={`/product/${item.id}?label=inventory`}>
                          <button
                            type="button"
                            className="inline-flex items-center gap-s-2 text-sm rounded-lg border border-transparent text-[#213B85] hover:text-blue-800 focus:outline-none focus:text-blue-800 underline"
                          >
                            View Details
                            <RiArrowDropRightLine className="text-xl" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {currentProducts.length ? (
          currentProducts?.map((item, index) => (
            <div key={index} className="border my-2 rounded-lg py-4 bg-white">
              <div className="flex justify-between items-center pb-3 px-3">
                <div>
                  <span
                    className={`rounded-2xl text-xs py-1 border ${item.availabilityStatus == "In Stock"
                      ? "text-[#09AD95] bg-[#E6F7F4] px-3.5 border-[#A3E9D1]"
                      : "text-[#DC3545] bg-[#FDE9EC] border-[#FFC6CE] px-2"
                      }`}
                  >
                    {item.availabilityStatus}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 text-sm font-semibold  border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 bg-[#E7F0FC] p-1.5 rounded-full border-[#C3DDFF]"
                  >
                    <MdOutlineModeEdit />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 ml-2 bg-[#FDE9EC] p-1.5 rounded-full border-[#FFC6CE]"
                    onClick={() => handleDelete(item.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className=" border-t px-3">
                <div className="flex items-center py-3 text-sm font-semibold">
                  <div className="pe-3">
                    <Image
                      width={100}
                      height={100}
                      src={item.images[0]}
                      alt={item.title}
                      className="bg-gray-200 w-14 h-14 object-cover"
                    />
                  </div>
                  <div>
                    <div>
                      <Link href={`/product/${item.id}?label=inventory`} className="hover:text-[#213B85]">
                        {item.title}
                      </Link>
                    </div>
                    <div> $ {item.price}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-xs text-[#999999]">Category</div>
                    <div className="text-sm font-semibold">{item.category}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#999999]">Brand</div>
                    <div className="text-sm font-semibold">{item.brand || '-'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#999999]">Weight</div>
                    <div className="text-sm font-semibold">{item.weight}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white">
            <div colSpan="10" className="text-center py-4">No products found</div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="bg-white flex md:flex-row max-md:gap-2 flex-col items-center justify-between md:mb-6 border-t-2 pt-4 px-8">
        <div className='max-md:text-sm'>
          Showing {startItem}-{endItem} of {filteredProducts.length} Entries
        </div>

        <div className="flex justify-center items-center space-x-2 max-md:text-sm">

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 border border-transparent rounded hover:text-[#213B85] focus:outline-none"
          >
            <GrFormPrevious /> Prev
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`px-3 py-1 border border-transparent rounded hover:text-[#213B85] focus:outline-none ${currentPage === pageNumber + 1 ? 'text-blue-500  bg-[#E7F0FC]' : 'text-gray-700'}`}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 border border-transparent rounded hover:text-[#213B85] focus:outline-none"
          >
            Next <MdNavigateNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
