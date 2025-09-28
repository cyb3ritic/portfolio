import React from "react";

export default function BA() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Python Hello World</h1>
      <pre>
{`

# Load required libraries
library(rpart)
library(ggplot2)
library(Metrics)

# Load dataset
data(mtcars)
head(mtcars)
# ----------------- Normalize the dataset -----------------
mtcars_norm <- as.data.frame(scale(mtcars))

# Train-test split (80-20)
set.seed(123)
n <- nrow(mtcars_norm)
print(n)
train_index <- sample(1:n, size = 0.8 * n)

train <- mtcars_norm[train_index, ]
test  <- mtcars_norm[-train_index, ]


# ----------------- Linear Regression -----------------
lm_model <- lm(mpg ~ ., data = train)
lm_pred <- predict(lm_model, test)

lm_rmse <- rmse(test$mpg, lm_pred)

# R2 (need to calculate manually if not using caret)
lm_r2 <- 1 - sum((test$mpg - lm_pred)^2) / sum((test$mpg - mean(test$mpg))^2)

cat("Linear Regression - RMSE:", lm_rmse, " R2:", lm_r2, "\n")

# ----------------- Decision Tree -----------------
tree_model <- rpart(mpg ~ ., data = train, method = "anova")
tree_pred <- predict(tree_model, test)

tree_rmse <- rmse(test$mpg, tree_pred)
tree_r2   <- 1 - sum((test$mpg - tree_pred)^2) / sum((test$mpg - mean(test$mpg))^2)

cat("Decision Tree - RMSE:", tree_rmse, " R2:", tree_r2, "\n")


# ----------------- Plot Predictions -----------------

# Linear Regression Predictions
plot(test$mpg, lm_pred,
     xlab = "Actual mpg",
     ylab = "Predicted mpg",
     main = "Linear Regression Predictions",
     col = "blue", pch = 19)
abline(0, 1, col = "red", lty = 2)

# Decision Tree Predictions
plot(test$mpg, tree_pred,
     xlab = "Actual mpg",
     ylab = "Predicted mpg",
     main = "Decision Tree Predictions",
     col = "green", pch = 19)
abline(0, 1, col = "red", lty = 2)




#--------------For iris datasets---------
  # Load required libraries
library(nnet)         # for multinomial logistic regression
library(randomForest) # for random forest

# Load dataset
data(iris)
head(iris)

# ----------------- Normalize predictors -----------------
iris_norm <- as.data.frame(scale(iris[, 1:4]))
iris_norm$Species <- iris$Species  # keep target

# ----------------- Train-test split (80-20) -----------------
set.seed(123)
n <- nrow(iris_norm)
train_index <- sample(1:n, size = 0.8 * n)

train <- iris_norm[train_index, ]
test  <- iris_norm[-train_index, ]

# ----------------- Logistic Regression -----------------
log_model <- multinom(Species ~ ., data = train, trace = FALSE)
log_pred <- predict(log_model, test)

# Confusion matrix & accuracy
log_cm <- table(Predicted = log_pred, Actual = test$Species)
log_acc <- sum(diag(log_cm)) / sum(log_cm)

cat("Logistic Regression Accuracy:", log_acc, "\n")
print(log_cm)

# ----------------- Random Forest -----------------
rf_model <- randomForest(Species ~ ., data = train, ntree = 100)
rf_pred <- predict(rf_model, test)

# Confusion matrix & accuracy
rf_cm <- table(Predicted = rf_pred, Actual = test$Species)
rf_acc <- sum(diag(rf_cm)) / sum(rf_cm)

cat("Random Forest Accuracy:", rf_acc, "\n")
print(rf_cm)

# ----------------- Plot Predictions -----------------

# Logistic Regression Predictions
plot(test$Species, log_pred,
     xlab = "Actual Species",
     ylab = "Predicted Species",
     main = "Logistic Regression Predictions",
     col = "blue", pch = 19)

# Random Forest Predictions
plot(test$Species, rf_pred,
     xlab = "Actual Species",
     ylab = "Predicted Species",
     main = "Random Forest Predictions",
     col = "green", pch = 19)




`}
      </pre>
    </div>
  );
}
