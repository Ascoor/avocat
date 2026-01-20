import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { FaTrashAlt, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import API_CONFIG from '../../config/config';

const AnimatedRow = ({
  row,
  rowIndex,
  onEdit,
  onDelete,
  onView,
  headers,
  customRenderers,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    scale: isHovered ? 1.02 : 1,
    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
    config: { duration: 200 },
  });

  const rowClass = `text-gray-800 dark:text-gray-200 hover:bg-gradient-orange-light dark:hover:bg-gradient-blue-dark   dark:hover:bg-gray-700 transition  duration-300 border-b border-gray-200 dark:border-gray-600 ${isHovered ? 'bg-gray-50 dark:bg-gray-700' : ''}`;

  return (
    <animated.tr
      style={{
        ...springProps,
        transform: springProps.scale.to((s) => `scale(${s})`),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={rowClass}
    >
      {onView && (
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => onView(row.id)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <MdVisibility />
          </button>
        </td>
      )}
      {headers.map((header) => (
        <td
          key={`${rowIndex}-${header.key}`}
          className="px-4 py-2 text-center text-sm md:text-base lg:text-lg"
        >
          {header.key === 'image' ? (
            row.image ? (
              <img
                src={`${API_CONFIG.baseURL}${row.image}`}
                className="rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto shadow"
                alt="Row image"
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-300">
                N/A
              </div>
            )
          ) : customRenderers && customRenderers[header.key] ? (
            customRenderers[header.key](row)
          ) : (
            row[header.key]
          )}
        </td>
      ))}
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => onEdit(row.id)}
          className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-300"
        >
          <MdEdit />
        </button>
      </td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => onDelete(row)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
        >
          <FaTrashAlt />
        </button>
      </td>
    </animated.tr>
  );
};

const TableComponent = ({
  data,
  headers,
  customRenderers,
  onDelete,
  onEdit,
  onView,
  renderAddButton,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const filterData = () => {
      const keywords = searchQuery.trim().toLowerCase().split(/\s+/);

      const filtered = data.filter((item) => {
        return keywords.every((keyword) => {
          return headers.some(
            (header) =>
              header.key !== 'actions' &&
              item[header.key]?.toString().toLowerCase().includes(keyword),
          );
        });
      });

      setFilteredData(filtered);
    };

    filterData();
  }, [searchQuery, data, headers]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortKey] || '';
      const bValue = b[sortKey] || '';

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    return sorted;
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  return (
    <section className="container mx-auto p-6  dark:bg-gray-800 rounded-lg shadow-md font-['tajawal']">
      <div className="w-full mb-8 flex flex-col md:flex-row justify-between items-center">
        {renderAddButton && (
          <div className="mb-4 md:mb-0">{renderAddButton()}</div>
        )}
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="ابحث"
            className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-violet-400 dark:bg-gray-700 dark:text-gray-300"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {filteredData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto shadow-md">
            <thead className="text-sm font-semibold tracking-wide text-center text-gray-100 bg-blue-500 dark:bg-gradient-night dark:text-avocat-orange-light uppercase border-b border-gray-600">
              <tr>
                {onView && <th className="px-4 py-3">عرض</th>}
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort(header.key)}
                  >
                    {header.text}
                    {sortKey === header.key &&
                      (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                  </th>
                ))}
                <th className="px-4 py-3">تعديل</th>
                <th className="px-4 py-3">حذف</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={row.id}
                  className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 border-b border-gray-200 dark:border-gray-600"
                >
                  {onView && (
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => onView(row.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        <MdVisibility />
                      </button>
                    </td>
                  )}
                  {headers.map((header) => (
                    <td
                      key={`${row.id}-${header.key}`}
                      className="px-4 py-2 text-center text-sm md:text-base lg:text-lg"
                    >
                      {customRenderers[header.key]
                        ? customRenderers[header.key](row)
                        : row[header.key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onEdit(row.id)}
                      className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-300"
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200">لا يوجد بيانات</p>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full transition duration-300
            ${currentPage === 1 ? 'opacity-50 cursor-default' : ''}
            bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-105   *:
          `}
        >
          سابق
        </button>
        <span className="text-gray-200 dark:text-gray-600">
          الصفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full transition duration-300
            ${currentPage === totalPages ? 'opacity-50 cursor-default' : ''}
            bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-105           `}
        >
          التالي
        </button>
      </div>
    </section>
  );
};

export default TableComponent;
