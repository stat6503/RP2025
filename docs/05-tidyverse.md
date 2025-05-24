

# tidyverse 통합 패키지

## tidyverse 이해
+ Hadley Wickham이 개발한 데이터 과학을 위한 R 패키지의 집합체(collection)
+ 모든 패키지는 공통적이고 일관된 설계 철학, 문법, 데이터 구조를 공유함
+ 정돈된 세계(tidy + universe)를 구성하여 작업을 직관적이고 일관성있게 수행하도록 도와줌
+ tidy API의 4가지 원칙
  + 기존 자료구조의 재사용(reuse existing data structures)
  + 파이프 연산자를 이용한 단순한 함수 조합(compose simple function with pipe)
  + 함수형 프로그래밍을 적극 포용(embrace functional programming)
  + 사람을 위한 설계(design for humans)


|패키지|설명|
|:---:|:------------|
|tibble|tidyverse에서 사용하는 R 데이터 객체 제공|
|readr|tibble로 외부 파일을 불러오거나 저장하는 함수 제공|
|tidyr|타이디 데이터(tidy data)를 구현하는 함수 제공|
|dplyr|데이터 가공, 탐색적 자료분석 등을 위한 함수 제공|
|stringr|문자열(string)을 다루는 함수 제공|
|forcats|팩터(factor)를 다루는 함수 제공|
|lubridate, hms|날짜, 시간을 다루는 함수 제공|
|purrr|함수형 프로그래밍 도구 제공|
|ggplot2|데이터 시각화를 위한 함수 제공|


<br>

![](./img/fig5-1.png)

<br>


----------------------------------------------------------------------


## tidyverse 작업 흐름
+ tidyverse 통합 패키지는 다음과 같은 데이터 분석 프로젝트의 작업 흐름을 지원하도록 설계됨

![](./img/fig5-2.png)

<br>


----------------------------------------------------------------------


## 타이디 데이터(tidy data)
+ tidyverse에서 사용되는 데이터 표준 저장 형태로, 분석에 용이하고 깔끔한(tidy) 데이터
+ 타이디 데이터의 3가지 규칙
  1. 모든 열은 변수이다(Every column is variable).
  2. 모든 행은 관측값이다(Every row is an observation).
  3. 모든 셀은 단일 값을 가진다(Every cell is a single value).

![](./img/fig5-4.png)

<br>


----------------------------------------------------------------------


## 파이프(pipe) 연산자
+ ```%>%``` - 다중 연산을 하나의 순차적인 연산의 결합으로 표현하는 강력한 도구
+ 단축키 ```ctrl``` + ```shift``` + ```m```
+ 데이터 연산의 흐름을 좌에서 우로 변경(기존 방식은 안에서 밖임)
  + 왼쪽 표현식(left-hand side expression)의 결과를 오른쪽 표현식(right-hand side expression)으로 전달함
  + 이때, lhs은 rhs의 첫 번째 매개변수로 사용됨
  + lhs가 사용될 위치를 지정하기 위해서는 rhs에서 place-holder ```.```를 사용해야 함
+ 연산 작업 중 어느 위치에서나 쉽게 단계를 추가할 수 있음
+ 복잡한 코드를 단순화시켜 가독성 크게 향상시킴
+ 2014년 개발된 magrittr 패키지에 포함되어 있음
+ 2021년 R version 4.1.0부터는 기본 파이프 연산자 ```|>``` 새롭게 추가됨
  + 인자없이 함수를 호출하더라도 항상 괄호가 필요함
  + place-holder로 ```_```를 사용하며, 이때 반드시 전달받을 인자를 명시해야 함


``` r
# 데이터프레임 x에 f(), g(), h() 함수를 순차적으로 적용
# 일반적인 경우: 함수를 중첩해서 사용
h(g(f(x)))

# 파이프 연산자를 사용하는 경우: 연쇄적인 연산의 결합으로 표현
x %>% 
  f() %>% 
  g() %>% 
  h()
```


``` r
# magrittr 파이프 연산자 %>%
mtcars %>% head
mtcars %>% head(10)
mtcars %>% lm(mpg ~ disp, .)
mtcars %>% .$gear
```


``` r
# R 기본 파이프 연산자 |>
mtcars |> head                              # Error
mtcars |> head()
mtcars |> head(10)
mtcars |> lm(mpg ~ disp, _)                 # Error
mtcars |> lm(mpg ~ disp, data = _)
mtcars |> _$gear
```


<br>


----------------------------------------------------------------------


## tibble 패키지

### tibble
+ tidyverse에서 사용하는 R 데이터 자료구조
+ 좀 더 편리하게 사용할 수 있도록 수정된 특수한 종류의 데이터프레임으로, 데이터프레임과 근본적으로 큰 차이는 없음
+ 데이터를 출력할 때 콘솔 창이 넘어가지 않도록 설계되어 있음
  + ```str()``` 함수 기능을 가져와 각 변수(열)의 자료형과 이름을 함께 표시
  + 처음 10개의 행과 한 화면에 들어갈 수 있는 열만 표시
  + 전체 데이터셋을 보기 위해서는 ```View()``` 함수 사용
+ 입력 유형(input's type)이 변경하지 않음
+ 변수 이름을 바꾸거나 행 이름을 생성하지 않음

|변수 라벨|설명|
|:---:|:------------|
|\<chr\>|문자형(character)|
|\<int\>|정수형(integer)|
|\<dbl\>|실수형(double)|
|\<date\>|날짜(date)|
|\<time\>|시간(time)|
|\<dttm\>|날짜와 시간(date-time)|
|\<lgl\>|논리형(logical)|
|+lbl|변수의 값에 부여된 라벨 값이 추가되어 있음을 표시|


``` r
library(nycflights13)
flights
fligths %>% View()
```

<br>

### tibble 이해
+ 새로운 tibble 생성 - ```tibble()``` 함수
  + 길이가 1인 입력은 자동으로 재사용(recycle)함
  + 방금 만든 변수를 참조할 수 있음
  + 변수 이름 지정이 훨씬 유연함 - ``` `` ```(backticks) 사용
  

``` r
library(tibble)

mytbl <- tibble(
  x = 1:5, 
  y = 1, 
  z = x ^ 2 + y
)

mytbl
```

```
## # A tibble: 5 × 3
##       x     y     z
##   <int> <dbl> <dbl>
## 1     1     1     2
## 2     2     1     5
## 3     3     1    10
## 4     4     1    17
## 5     5     1    26
```

<br>

+ 데이터프레임을 tibble로 변환 - ```as_tibble()``` 함수
+ tibble을 데이터프레임으로 변환 - ```as.data.frame()``` 함수


``` r
as_tibble(iris)
as.data.frame(flights)
```


<br>

+ 부분집합(subset)에 엄격하며, ```[]```은 항상 tibble을 반환함
+ 하나의 열만 추출하려면 ```[[]]``` 또는 ```$```을 사용


``` r
df <- data.frame(x = 1:3, y = 3:1)
class(df[, 1:2])                            # "data.frame"
class(df[, 1])                              # "integer"

tbl <- tibble(x = 1:3, y = 3:1)
class(tbl[, 1:2])                           # "tbl_df"  "tbl"  "data.frame"
class(tbl[, 1])                             # "tbl_df"  "tbl"  "data.frame"

class(tbl[[1]])                             # "integer"
class(tbl$x)                                # "integer"
```

