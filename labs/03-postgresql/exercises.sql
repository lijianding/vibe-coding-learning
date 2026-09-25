-- TODO 1
-- 查询所有 active project，只返回：
-- organization_id, id, name

-- TODO 2
-- 查询 Hospital A 中 60 天内即将上线的项目。

-- TODO 3
-- 按 Organization 统计项目总数。

-- TODO 4
-- 找出每个 Organization 的 active 项目数量。

-- TODO 5
-- 为 go_live_date 设计一个索引。
-- 先说明：什么查询能利用它？

-- TODO 6
-- 写一个 Transaction：
-- 把 HIS Upgrade 改为 completed，
-- 然后故意执行一条失败 SQL，
-- 观察事务行为。

-- TODO 7
-- 尝试插入：
-- Hospital A 中第二个 "HIS Upgrade"
-- 观察 unique constraint。

-- TODO 8
-- 尝试把 status 写成 "invalid"
-- 观察 check constraint。

-- TODO 9
-- 写 EXPLAIN：
-- organization_id + status 查询。

-- TODO 10
-- 思考并写注释：
-- 为什么 unique(name) 不适合多租户？
