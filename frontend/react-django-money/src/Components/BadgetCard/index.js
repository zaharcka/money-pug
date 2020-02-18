import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const BudgetCard = (props) => {
 const {item: { name, total, user_list, id }, index, onOpenClick, isActive} = props;
 const valuta = total % 10 > 0 &&  total % 10 < 5 ? 'рубля' : 'рублей';
 const egoist = user_list.length === 1 ? true : false;

 const userString = egoist
   ? `Бюджет пользователя ${user_list[0].first_name} ${user_list[0].last_name}`
   : `Бюджет пользователей ${user_list[0].first_name} ${user_list[0].last_name} и ${user_list[1].first_name} ${user_list[1].last_name}`
  return (
    <Card style={{flex: 1}}>
      <CardContent>
        <Typography style={{fontSize: 14,}} color="textSecondary" gutterBottom>
          {egoist ? 'Приватный бюджет' : 'Бюджет'} # {index+1}
        </Typography>
        <Typography variant="h5" component="h2" style={{ textDecoration: isActive ? 'underline' : null }}>
          {name}
        </Typography>
        <Typography style={{marginBottom: 12, fontSize: 10 }} color="textSecondary">
          {userString}
        </Typography>
        <Typography variant="body2" component="p">
          Всего {total} {valuta}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onOpenClick(id)} >Открыть</Button>
      </CardActions>
    </Card>
  );
};


export default BudgetCard;
