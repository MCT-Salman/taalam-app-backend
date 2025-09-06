import { createSubAdmin, setUserRole, toggleUserActive } from "../services/admin.service.js";

/**
 * @route ~/api/admin/create-subadmin
 * @desc create new account with subadmin role
 * @access private (only admin)
 */
export const addSubAdmin = async (req, res) => {
  try {
    const { phone, password, name, birthDate } = req.body;
    const user = await createSubAdmin(phone, password, name, birthDate);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * @route ~/api/admin/set-role
 * @desc change role for any account
 * @access private (only admin)
 */
export const changeRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updated = await setUserRole(userId, role);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * @route ~/api/admin/toggle-active
 * @desc disable or enable for any account
 * @access private (only admin)
 */
export const deactivateUser = async (req, res) => {
  try {
    const { userId, active } = req.body;
    const updated = await toggleUserActive(userId, active);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
