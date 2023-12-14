import React, { useEffect, useState } from 'react';
import * as styled from './FaqCategoryPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaqCategories, deleteFaqCategory } from '../../App/Features/Faq/faqActions';
import {
   allFaqCategoriesSelector,
   allFaqCategoriesLoadingSelector,
   allFaqCategoriesErrorSelector,
} from './FaqCategory.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { Popconfirm } from 'antd';

const ROW = [{ heading: 'Heading' }, { heading: 'Is Show' }, { heading: 'Created At' }, { heading: 'Actions' }];

function FaqCategoryPage() {
   const [Page, setPage] = useState(0);

   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   const allFaqCategories = useSelector(allFaqCategoriesSelector);
   const allFaqCategoriesLoading = useSelector(allFaqCategoriesLoadingSelector);
   const allFaqCategoriesError = useSelector(allFaqCategoriesErrorSelector);

   const navigation = useNavigate();
   const dispatch = useDispatch();

   const nextPageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const prevPageHandler = function () {
      setPage((prevState) => prevState - 1);
   };

   const deleteHandler = (categoryId) => {
      dispatch(deleteFaqCategory({ categoryId }));
   };

   const editHandler = (categoryId) => {
      navigation(`/faq-category/edit/${categoryId}`);
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllFaqCategories({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Faq Category'}
               subHeading={'Faq Category'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={
                  <MenuItem onClick={() => navigation('/faq-category/create')}>Create new faq category</MenuItem>
               }
            />
            <div className="mt-2">
               {!!allFaqCategoriesError && <p className="text-sm error_cl">{allFaqCategoriesError}</p>}
               {!!allFaqCategoriesLoading && <SpinnerComponent />}
               {!!allFaqCategories &&
               allFaqCategories?.success &&
               !!allFaqCategories?.categories &&
               allFaqCategories?.categories.length ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={nextPageHandler}
                     nextAndPrev={true}
                     prevHandler={prevPageHandler}
                     disablePrevbtn={+Page === 0 ? true : false}
                     disableNextbtn={+Page >= allFaqCategories?.totalPages ? true : false}
                  >
                     {allFaqCategories?.categories.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.heading}</td>
                           <td>{el?.isShow ? 'Yes' : 'No'}</td>
                           <td>{dayjs(el?.createdAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                           <td className="flex items-center space-x-2">
                              <FiEdit2 className="cursor-pointer" onClick={() => editHandler(el?._id)} />
                              <Popconfirm
                                 title="Delete the task"
                                 description="Are you sure to delete this?"
                                 onConfirm={() => deleteHandler(el?._id)}
                                 okText="Yes"
                                 cancelText="No"
                              >
                                 <MdDelete className="cursor-pointer" />
                              </Popconfirm>
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default FaqCategoryPage;
