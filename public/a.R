data(iris)
head(iris)
iris_norm <- as.data.frame(scale(iris[,-5]))

iris_norm$Species <- iris$Species
head(iris_norm)

set.seed(123)
library(caTools)

<!-- n <- nrow(iris_norm) -->
<!-- train_index <- sample(1:n, size = 0.8*n) -->
<!-- train <- iris_norm[train_index,] -->
<!-- test <- iris_norm[-train_index,] -->

split <- sample.split(iris_norm$Species, SplitRatio = 0.7)
train <- subset(iris_norm, split == TRUE)
test <- subset(iris_norm, split == FALSE)

install.packages("nnet")
library(nnet)
model <- multinom(Species ~., data = train)
pred <- predict(model, newdata = test)

cm = table(pred, actual = test$Species)
mean(pred == test$Species)
accuracy = sum(diag(cm)) / sum(cm)
print(accuracy)

install.packages("rpart")
library(rpart)
tree_model <- rpart(Species ~., data = train, method = "class")
tree_pred <- predict(tree_model, test[, -5], type = "class")

table(tree_pred, actual = test$Species)
mean(tree_pred == test$Species)


install.packages("ggplot")

pca = prcomp(iris_norm[,-5], center = TRUE, scale. = TRUE)
pca_data = data.frame(pca$x[,1:2], Species = iris_norm$Species)

pca_data$multinom_pred <- NA
pca_data$multinom_pred[!split] <- pred


pca_data$tree_pred <- NA
pca_data$tree_pred[!split] <- tree_pred

p1 <- ggplot(pca_data, aes(PC1, PC2, color = Species)) + geom_point(size = 3, alpha = 0.7) + labs(title = "PCA for Actual") + theme_minimal()

p1

p2 <- ggplot(pca_data[!split, ], aes(PC1, PC2, color = multinom_pred)) + geom_point(size = 3, alpha = 0.7) + labs(title = "PCA for Logistic Data") + theme_minimal()

p2


p3 <- ggplot(pca_data[!split, ], aes(PC1, PC2, color = tree_pred)) + geom_point(size = 3, alpha = 0.7) + labs(title = "PCA for Tree Data") + theme_minimal()

p3





#Numeric data regression


library(caret)       
library(rpart)       
library(rpart.plot)  
library(ggplot2)     

data(mtcars)

norm_data <- as.data.frame(scale(mtcars))
set.seed(123)
trainIndex <- createDataPartition(norm_data$mpg, p = 0.7, list = FALSE)
train <- norm_data[trainIndex, ]
test  <- norm_data[-trainIndex, ]


lm_model <- lm(mpg ~ ., data = train)
lm_pred  <- predict(lm_model, newdata = test)


dt_model <- rpart(mpg ~ ., data = train, method = "anova")
dt_pred  <- predict(dt_model, newdata = test)

rpart.plot(dt_model)

results <- data.frame(
  Actual = test$mpg,
  Linear_Regression = lm_pred,
  Decision_Tree = dt_pred
)
results



eval_metrics <- function(actual, predicted) {
  mse  <- mean((actual - predicted)^2)
  rmse <- sqrt(mse)
  mae  <- mean(abs(actual - predicted))
  r2   <- cor(actual, predicted)^2
  return(list(MSE = mse, RMSE = rmse, MAE = mae, R2 = r2))
}

lm_metrics <- eval_metrics(test$mpg, lm_pred)
dt_metrics <- eval_metrics(test$mpg, dt_pred)

print("Linear Regression Metrics:")
print(lm_metrics)

print("Decision Tree Metrics:")
print(dt_metrics)


# Linear Regression plot
ggplot(results, aes(x = Actual, y = Linear_Regression)) +
  geom_point(color = "blue") +
  geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "red") +
  ggtitle("Actual vs Predicted - Linear Regression") +
  theme_minimal()



ggplot(results, aes(x = Actual, y = Decision_Tree)) +
  geom_point(color = "darkgreen") +
  geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "red") +
  ggtitle("Actual vs Predicted - Decision Tree") +
  theme_minimal()  
  