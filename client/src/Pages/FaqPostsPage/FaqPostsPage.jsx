import React, { useEffect, useState } from 'react';
import * as styled from './FaqPostsPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFaqPost, getAllFaqPosts } from '../../App/Features/Faq/faqActions';
import { allFaqPostsSelector, allFaqPostsLoadingSelector, allFaqPostsErrorSelector } from './FaqPosts.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { Popconfirm } from 'antd';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';

const ROW = [{ heading: 'heading' }, { heading: 'Is Default' }, { heading: 'Created At' }];

function FaqPostsPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [Page, setPage] = useState(0);

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const allFaqPosts = useSelector(allFaqPostsSelector);
   const allFaqPostsLoading = useSelector(allFaqPostsLoadingSelector);
   const allFaqPostsError = useSelector(allFaqPostsErrorSelector);

   const nextPageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const prevPageHandler = function () {
      setPage((prevState) => prevState - 1);
   };

   const editHandler = function (id) {
      navigation(`/faq-post/edit/${id}`);
   };

   const deleteHandler = function (id) {
      dispatch(deleteFaqPost({ postId: id }));
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllFaqPosts({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Faq Posts'}
               subHeading={'Faq Posts'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={<MenuItem onClick={() => navigation('/faq-post/create')}>Create new faq category</MenuItem>}
            />
            <div className="mt-4">
               {!!allFaqPostsLoading && <SpinnerComponent />}
               {!!allFaqPostsError && <p className="error_cl text-sm">{allFaqPostsError}</p>}
               {!!allFaqPosts && allFaqPosts?.success && !!allFaqPosts?.posts && allFaqPosts?.posts.length ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={nextPageHandler}
                     nextAndPrev={true}
                     prevHandler={prevPageHandler}
                     disablePrevbtn={+Page === 0 ? true : false}
                     disableNextbtn={+Page >= allFaqPosts?.totalPages ? true : false}
                  >
                     {allFaqPosts?.posts.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.heading}</td>
                           <td>{el?.isDefault ? 'Yes' : 'No'}</td>
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
               ) : (
                  !allFaqPostsLoading && (
                     <div className="text-center">
                        <p className="text-gray-300">No Posts</p>
                     </div>
                  )
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default FaqPostsPage;
