import React from 'react';
import {connect} from 'dva';
import { Button, Modal, Card } from 'antd';
import styles from './SeatPage.css';

import Footer from './Footer';

class SeatPage extends React.Component {

    componentDidMount(){
        this.reloadSeat();
    }

    reloadSeat(){
        console.log(this.props)
        this.props.dispatch({
            type:"seat/getSeat"
        })
    }

    toChoose = (id,obj) => {
        Modal.confirm({
            title: '您确定要选择这张桌子吗?',
            content: '此桌子您只能占用1个小时时间，如需续时请去柜台找服务人员办理',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk:() => {
                this.props.dispatch({
                    type:"seat/chooseSeat",
                    id:id
                });
                this.props.dispatch({
                    type:"order/updataOrderSeat",
                    obj:{...obj,orderSeatId:id}
                });
                this.reloadSeat();
                window.location.href = '/#/menu';
             },
            onCancel() {
              
            },
          });
        
        
    }

    render(){
        var list = this.props.seat.list;
        var obj = this.props.order.obj;
        return (
            <div className="seat">
                <div className={styles.header}>
                    选择座位
                </div>
                <div> 
                    <Card className={styles.card} title="店家小贴士" >
                    <p>客流量火爆，桌位可能不够，请没有桌位的顾客暂且等待或选择其他店铺就餐,祝您用餐愉快！</p>
                    </Card>
                </div>
                {/* {JSON.stringify(this.props.seat.list)} */}
                <div className={styles.outer}>
                    {
                        list.map((seat)=>{
                            if(seat.seatType === "空闲"){
                                return (
                                <Button shape="circle" onClick={this.toChoose.bind(this,seat.seatId,obj)} key={seat.seatId}>   
                                    <p>{seat.seatPosition}</p>
                                    <p>{seat.seatType}</p>
                                </Button>
                                )
                            } else {
                                return (
                                <Button shape="circle" type="danger" disabled key={seat.seatId}>
                                    <p>{seat.seatPosition}</p>
                                    <p>{seat.seatType}</p>
                                </Button>
                                )
                            }
                          })
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(state=>state)(SeatPage);