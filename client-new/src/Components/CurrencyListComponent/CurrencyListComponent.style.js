import styled from "styled-components"


export const Card = styled.div`
border-radius: .175rem;
display: flex;
align-items:center;
justify-content: space-between;
padding: 4px 5px; 

.smallWrapper{
display: flex;
align-items: center;
justify-content: space-around;

.questioncirlce{
    margin-left: 4px;
}

._title{
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 10px;
}

span svg path{
    stroke: #3bc016;
}
}

img{
    height: 35px !important;
}

._lockiconparent{
    display: flex;
    align-items: center;
}

.inr{
    display: flex;
    align-items: center;
}


`
